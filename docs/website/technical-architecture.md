# Rusongs Platform Technical Architecture (MVP to Production)

## 1. Purpose and Scope

This document describes the technical architecture for the Rusongs platform, starting from a pragmatic MVP and evolving toward a production-grade, high-load service. It covers implementation details for the primary web application (Next.js), backend services, data storage, media ingestion, and the scaling path required to support millions of song performances and concurrent users.

## 2. Product Goals and MVP Focus

- Deliver a unified catalog of Russian songs and their performances, with verified lyrics, chords, and contextual metadata.
- Enable curation, rating, and discussion features that create a community-driven knowledge base.
- Onboard a crawler pipeline to continuously enrich the catalog with high-quality external recordings.

### MVP Success Criteria

- 500 songs with at least 3 performances each, indexed and searchable.
- Public catalog with server-rendered pages for SEO and shareability.
- Authenticated contributors who can submit performances and edits for moderation.
- Baseline analytics, observability, and incident response routines.

## 3. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       Client Interfaces                       │
│  - Web (Next.js App Router)                                   │
│  - Admin/Moderator console                                    │
│  - Public API (future)                                        │
└──────────────────────────────────────────────────────────────┘
                 │ Server-side rendering / REST
┌────────────────┴──────────────────────────────────────────────┐
│                Next.js Application (BFF Layer)                │
│  - Route Handlers / Server Actions                            │
│  - Authentication (NextAuth)                                  │
│  - Catalog, Community, Account modules                        │
└───────────────┬───────────────────────────────────────────────┘
                │ Prisma ORM / gRPC (future services)
┌───────────────┴───────────────────────────────────────────────┐
│                  Core Platform Services                       │
│  - PostgreSQL (transactional data)                            │
│  - Redis (cache, session store, job queue)                    │
│  - Object Storage (lyrics assets, thumbnails)                 │
│  - Search Index (Postgres FTS → Elasticsearch)                │
└───────────────┬───────────────────────────────────────────────┘
                │ Event-driven ingestion
┌───────────────┴───────────────────────────────────────────────┐
│                Media Ingestion & Crawler Layer                │
│  - Node.js workers (Playwright, Axios)                        │
│  - Task scheduler (BullMQ / Temporal)                         │
│  - Content moderation & enrichment pipeline                   │
└───────────────────────────────────────────────────────────────┘
```

## 4. Functional Modules (MVP)

- **Catalog**: song, performance, artist entities; browsing, filtering, search.
- **Media viewer**: embedded playback wrappers for YouTube, VK, RuTube, audio.
- **Community**: ratings, comments, suggested edits, playlists/collections.
- **Contributor tools**: submission forms, validation, moderation queue.
- **Crawler operations**: automated discovery and refresh of performances.

## 5. Next.js Application Architecture

- **Framework**: Next.js 14 with the App Router, leveraging server components for data-heavy views (song pages, catalog listing) and client components for interactive widgets (player controls, chord tools).
- **UI Layer**: Tailwind CSS + shadcn/ui, encapsulating reusable design tokens for accessibility.
- **State Management**: React Query for server state, Zustand for session-level client state (e.g., compare queue).
- **Authentication**: NextAuth.js with email/password and OAuth providers (VK, Google). Session tokens persisted in encrypted cookies; Redis used as session store for scale.
- **API Layer**: Next.js route handlers providing RESTful endpoints under `/api/*`. Gradual migration path to gRPC/GraphQL once non-web clients or complex queries emerge.
- **Server Actions**: used for authenticated mutations (rating, commenting) to minimize frontend boilerplate while enforcing server-side validation (Zod).
- **Internationalization**: `next-intl`, defaulting to Russian with English expansion planned.

### API Module Breakdown

| Module           | Endpoint Prefix | Responsibilities                              | Notes                                   |
|------------------|-----------------|-----------------------------------------------|-----------------------------------------|
| Catalog          | `/api/catalog`  | Song lookup, listing, filtering, FTS queries  | Configurable caching headers            |
| Performances     | `/api/performances` | CRUD for performances, rating submissions | Writes require authenticated session    |
| Community        | `/api/community` | Comments, discussions, moderation actions     | Real-time updates via SSE/WebSockets    |
| Accounts         | `/api/account`  | Profile, preferences, contributor status      | Connects to NextAuth callbacks          |
| Admin/Crawler    | `/api/admin`    | Trigger crawlers, view task status, approvals | Protected by RBAC + IP allow list       |


## 6. Data Model (MVP)

### Core Tables

| Table             | Key Fields                                                                                                   | Description |
|-------------------|--------------------------------------------------------------------------------------------------------------|-------------|
| `songs`           | `id (uuid)`, `slug`, `title`, `original_title`, `genre`, `era`, `language`, `lyrics_markup`, `created_at`    | Canonical song metadata. |
| `artists`         | `id`, `name`, `type`, `country`, `bio`, `created_at`                                                         | Performer information. |
| `performances`    | `id`, `song_id`, `primary_artist_id`, `source_type`, `source_url`, `release_year`, `duration`, `quality_json`, `ingestion_status`, `created_at` | Individual recordings with quality scoring. |
| `performance_artists` | `performance_id`, `artist_id`, `role`                                                                   | Many-to-many linking for collaborations. |
| `users`           | `id`, `email`, `password_hash`, `auth_provider`, `role`, `display_name`, `preferences_json`, `created_at`   | End users and contributors. |
| `ratings`         | `id`, `performance_id`, `user_id`, `score_overall`, `score_audio`, `score_emotion`, `comment`, `created_at` | Structured rating schema. |
| `comments`        | `id`, `entity_type`, `entity_id`, `user_id`, `body`, `parent_id`, `status`, `created_at`                     | Threaded discussions. |
| `collections`     | `id`, `name`, `description`, `owner_id`, `visibility`, `created_at`                                         | Playlists and curated sets. |
| `collection_items`| `collection_id`, `performance_id`, `position`, `added_by`, `created_at`                                     | Ordered items within collections. |
| `ingestion_jobs`  | `id`, `source`, `payload_json`, `status`, `retries`, `scheduled_for`, `completed_at`                        | Crawler task tracking. |

### Schema Governance

- **ORM**: Prisma, checked into repository with migration histories (`prisma/migrations`).
- **Validation**: Zod schemas mirrored in backend to ensure type safety between server/client components.
- **Soft Deletes**: `deleted_at` columns on key tables to preserve history, enabling moderation and audit trails.
- **Auditing**: Change tables (`*_events`) appended as the platform scales, enabling CDC (Change Data Capture) downstream.

## 7. Search and Discovery

- **MVP**: Postgres full-text search with `tsvector` columns on songs (title, lyrics) and performances (artists, tags). `pg_trgm` for fuzzy matching.
- **Caching**: Query results cached in Redis for hot search queries and filters (with short TTL to respect content updates).
- **Progression**: Migrate to Elasticsearch/OpenSearch once dataset exceeds Postgres FTS comfort—enabling aggregations (by decade, genre) and near real-time indexing from ingestion events.

## 8. Media Ingestion Pipeline

- **Sources**: YouTube, VK, RuTube, Yandex Music, Smotrim (others via adapters).
- **Workflow**:
  1. Scheduler enqueues ingestion jobs (`ingestion_jobs`) via BullMQ.
  2. Worker pulls job, invokes adapter (Axios/Playwright) to fetch metadata and verify availability.
  3. Metadata normalized into canonical format, deduplicated using hash of title + artists + duration.
  4. Pending entries reviewed by moderators (MVP: manual approval, v2: automated heuristics).
  5. Approved performances persisted to Postgres, search index updated, cache invalidated.
- **Rate Management**: Per-source rate limiters, rotating residential proxies, exponential backoff and retry policies.
- **Content Storage**: Rusongs stores only metadata and lightweight assets:
  - Lyrics stored as Markdown with chord annotations.
  - Thumbnails and supplementary documents stored in S3-compatible bucket (e.g., Cloudflare R2).
  - Streaming sources rendered via embedded players respecting platform TOS.

## 9. Infrastructure and Environments

- **Hosting**:
  - MVP: Next.js on Vercel (edge caching, ISR), PostgreSQL on Railway or Neon, Redis on Upstash, object storage on Cloudflare R2.
  - Production: Kubernetes cluster (EKS or GKE) hosting Next.js server bundle, API gateway (Kong/NGINX), managed PostgreSQL (Aurora), dedicated Redis Enterprise, Elasticsearch cluster, S3 for object storage.
- **CI/CD**: GitHub Actions pipeline with stages:
  1. Lint, type-check, unit tests.
  2. Prisma migration validation (shadow database).
  3. Build Next.js application, run Playwright smoke tests.
  4. Deploy to preview environment; manual approval for production.
- **Environment Strategy**:
  - `development`: local Docker Compose (Next.js, Postgres, Redis, MinIO).
  - `staging`: mirrors production; used for load/performance testing.
  - `production`: blue/green deployments and canary releases for risk mitigation.

## 10. Observability and Operations

- **Logging**: Pino logger with structured JSON, shipped via OpenTelemetry to log aggregation (Datadog, Grafana Loki).
- **Metrics**: Prometheus exporters for Node.js, Postgres, Redis; dashboards in Grafana. Key SLIs: API latency (p95), ingestion success rate, cache hit ratio.
- **Tracing**: OpenTelemetry instrumentation for API handlers, Prisma queries, crawler jobs.
- **Alerting**: PagerDuty or Opsgenie hooks for on-call, Slack notifications for non-critical events.
- **Error Monitoring**: Sentry for frontend and backend runtime errors with source maps.

## 11. Security and Compliance

- **Authentication**: NextAuth using secure, httpOnly cookies; JWT mode disabled by default to reduce token leakage risk.
- **Authorization**: Role-based (user, contributor, moderator, admin) with policy enforcement via middleware.
- **Input Sanitization**: Zod validation + Prisma parameterization; DOMPurify for user-generated HTML fragments.
- **Secrets Management**: Vercel/Secrets Manager in MVP, transition to AWS Secrets Manager or HashiCorp Vault in production.
- **Data Protection**: HTTPS enforced, optional user PII encrypted at rest (Postgres column-level encryption, KMS-managed keys).
- **Compliance Roadmap**: GDPR readiness (DSAR workflows, data retention policies) once the user base includes EU residents.

## 12. Scaling Strategy

### Phase 1: Harden the MVP

- Implement aggressive caching (Redis, Vercel Edge) for read-heavy catalog pages.
- Introduce background workers for expensive mutations (e.g., re-indexing).
- Establish automated load testing scripts (k6) to measure baseline capacity.

### Phase 2: Service Separation

- Extract ingestion pipeline into dedicated service (Node.js or Go) communicating via gRPC or REST.
- Introduce message broker (Kafka or NATS) for ingestion events, enabling near real-time indexing and analytics pipelines.
- Implement CQRS for catalog reads (denormalized read models cached in Redis/Elasticsearch).

### Phase 3: High-Load Read Scaling

- Global CDN (Cloudflare) for static assets and ISR pages.
- Geo-replicate Postgres with read replicas; direct heavy read traffic to replicas via Prisma read/write split.
- Use edge functions for lightweight search autocomplete, backed by Redis global datastore.

### Phase 4: High-Load Write and Data Scale

- Shard performance ratings and comments by song ID or hash.
- Adopt Elasticsearch/OpenSearch with hot-warm architecture for search at scale.
- Implement data lake (S3 + Athena/Trino) for historical analytics and ML features (recommendations).

### Phase 5: Resilience and Multi-Region

- Multi-region deployment with active-active traffic routing, leveraging cloud-native load balancers.
- Employ feature flags and circuit breakers to degrade gracefully under partial outages.
- Disaster recovery runbooks with automated backups, PITR testing, and chaos engineering drills.

## 13. Testing Strategy

- **Unit Tests**: Jest + React Testing Library for components; Vitest for shared utilities.
- **Integration Tests**: Playwright (e2e user flows), Prisma test harness against ephemeral Postgres.
- **Contract Tests**: Pact between Next.js BFF and future microservices.
- **Performance Tests**: k6 scripts covering search, song view rendering, ingestion throughput.
- **Security Tests**: OWASP ZAP scans, SAST (CodeQL) and dependency scanning (npm audit + Snyk).

## 14. Roadmap Highlights

| Quarter | Focus                                      | Key Deliverables |
|---------|--------------------------------------------|------------------|
| Q1      | MVP feature completion                     | Catalog, ratings, basic ingestion, moderation queue |
| Q2      | Observability and ingestion scale          | Automated monitoring, rate-limited crawlers, improved deduplication |
| Q3      | Search and personalization                 | Elasticsearch migration, recommendation engine MVP |
| Q4      | Multi-platform and high availability       | Public API v1, mobile clients integration endpoints, blue/green deploys |

## 15. Open Questions

- Licensing constraints for embedding third-party media and potential need for direct hosting.
- Legal review for user-uploaded content moderation policies.
- Prioritization of mobile web vs. native applications in the product roadmap.

---

This architecture enables Rusongs to ship a focused Next.js-based MVP quickly while maintaining a clear evolutionary path to a resilient, high-load platform capable of serving a global community of music enthusiasts, performers, and historians.
