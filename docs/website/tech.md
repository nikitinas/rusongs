# Technical Stack: Rusongs.live + Crawler

## Core Web Stack

### Frontend + Fullstack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS + shadcn/ui
- **State management**: Zustand + React Query

## Data Layer and Storage

### Primary Database

- **PostgreSQL** – main transactional store.
- **Prisma** – migrations and ORM.

### Caching and Search

- **Redis** – cache, queues, sessions.
- **Elasticsearch** – indexing and full-text search for songs and performances.

## Crawler System

### Core Technologies

- **Puppeteer / Playwright** – complex sites and scripted browsing.
- **Cheerio** – lightweight HTML parsing.
- **Axios** – HTTP requests.
- **Node-cron** – scheduled jobs and recurring harvest tasks.

### API Integrations

```typescript
// Aggregated sources
const SOURCES = {
  youtube: "YouTube Data API v3",
  vk: "VK API",
  rutube: "RuTube API",
  yandex: "Yandex.Music API",
  smotrim: "Smotrim.ru API",
};
```

### Crawler Data Storage

- **Redis Queue** – crawl job scheduling and throttling.
- **PostgreSQL** – normalized crawl results.
- **Elasticsearch** – searchable index of harvested content.

## External Integrations

### Video Platforms

- **YouTube IFrame API**
- **VK Video API**
- **RuTube API**

### Hosting and Infrastructure

- **Vercel** – Next.js application hosting.
- **Railway** – databases and crawler runtime.
- **AWS S3** – static file storage and backups.

## Supporting Technologies

### Development

- **NextAuth.js** – authentication.
- **Zod** – schema validation.
- **React Hook Form** – form handling.

### Crawler Tooling

- **rate-limiter** – outbound request throttling.
- **proxy-rotator** – changing IP pools to avoid blocking.
- **user-agent-rotator** – emulating diverse clients.

## Architecture Overview

### Next.js App Router

- **Server Components** – data fetching and rendering.
- **Client Components** – interactive shells.
- **API Routes** – backend endpoints and crawler control webhooks.
- **ISR** – incremental updates for the song catalog.

### Crawler Microservice

- Runs as a dedicated Node.js worker.
- Continuously enriches the catalog with new performances.
- Exposes REST endpoints to manage sources, schedules, and crawl status.

### Internationalization

- **next-intl** – locale routing and translations.

The crawler operates as a background service, constantly updating the database with approved sources so that the web layer can surface fresh performances with minimal delay.
