# Rusongs Frontend Architecture & Design Guide

## 1. Purpose

This document captures the structure, feature set, and design system for the Rusongs web experience—the primary user touchpoint of the platform. It assumes a Next.js 14 (App Router) application and focuses on how we structure routes, components, state, and styling to deliver a responsive, accessible, and content-rich music encyclopedia.

## 2. Core Principles

- **Content-first**: Prioritize fast, server-rendered access to song data for SEO and shareability.
- **Progressive enhancement**: Baseline functionality delivered without JavaScript; enrich interactions progressively.
- **Consistency**: Shared design tokens and component primitives ensure visual and interaction harmony.
- **Performance & accessibility by default**: Follow Core Web Vitals targets and WCAG 2.1 AA.

## 3. Information Architecture

### Primary Navigation

1. Home (`/`)
2. Catalog (`/songs`, `/artists`, `/collections`)
3. Discover (`/themes`, `/decades`, `/featured`)
4. Community (`/discussions`, `/news`)
5. Contributors (`/contribute`, `/guidelines`)

Secondary navigation includes account access (`/account`, `/login`), admin (`/admin`), and language switcher.

### Key User Journeys

- **Search → Song detail → Performance playback**
- **Catalog browsing → Filters → Save to collection**
- **Contributor submission → Moderation status tracking**

## 4. Page Templates & Routing

| Page                        | Route Example                | Rendering Strategy                         | Notes |
|-----------------------------|------------------------------|---------------------------------------------|-------|
| Landing                     | `/`                          | SSR + Edge cache (ISR)                      | Highlights new content & featured collections. |
| Song catalog                | `/songs`                     | Server component + streamed filters         | Query params for decade, genre, popularity. |
| Song detail                 | `/songs/[slug]`              | Server component (lyrics), client widgets   | Caching with revalidation on updates. |
| Performance detail          | `/performances/[id]`         | Hybrid (SSR player metadata, CSR controls)  | Embeds third-party player, ratings widget. |
| Collections                 | `/collections/[slug]`        | Server component + incremental hydration    | Supports shareable playlists. |
| Contributor dashboard       | `/contribute`                | Auth-gated, CSR heavy                       | Optimistic updates for submissions. |
| Discussions                 | `/discussions/[topic]`       | SSR thread structure + client replies       | SSE/WebSocket for live updates. |
| Admin & moderation          | `/admin/*`                   | Protected route handlers + RSC bundles      | Role-based routing guard. |

### Dynamic Segment Conventions

- Use semantic slugs (`song-slug`, `artist-name`) for readability.
- Preserve stable IDs in URLs when sharing (e.g., `/performances/{uuid}`).
- Query parameters provide filter state; URL encoding ensures deep-linkable views.

## 5. Component System

### Layered Approach

1. **Foundations**: typographic scales, color tokens, spacing, shadows (`@/design/tokens`).
2. **Primitives**: button, link, card, modal, tabs (leveraging shadcn/ui patterns).
3. **Domain Components**: `SongHero`, `PerformanceCard`, `ChordSheet`, `RatingPanel`.
4. **Layout Components**: `AppShell`, `PageHeader`, `SplitPanel`, `StickySidebar`.

### Example Directory Structure

```
app/
  layout.tsx
  (marketing)/
  songs/
    [slug]/
      page.tsx
      PerformanceList.tsx
      SongTabs.tsx
  performances/
    [id]/
  contribute/
components/
  ui/
  domain/
  layout/
design/
  tokens.ts
  theme.css
```

### State Management

- Server components perform data fetching via Prisma/GraphQL requests, returning serializable props.
- React Query manages client data lifecycles for actions (ratings, comments) with optimistic updates.
- Zustand holds lightweight session state (e.g., compare tray, playback preferences).
- Context providers limited to cross-cutting concerns (theme, auth, player context).

## 6. Feature Highlights

- **Global search overlay** with typeahead (prefetch via SWR/React Query).
- **Performance comparison** table enabling side-by-side metrics.
- **Chord toolkit** featuring transpose, playback tempo hints, print-friendly view.
- **Collections** with drag-and-drop ordering (accessible via keyboard interactions).
- **Community interactions**: inline comments, reactions, moderation cues.
- **Realtime activity feed** for moderators (leveraging SSE).

## 7. Design System

### Visual Language

- **Color palette** (defined as CSS custom properties):
  - `--primary: #2C5530`
  - `--accent: #B8860B`
  - `--neutral-100` → `--neutral-900` for depth
- **Typography**:
  - Headings: `EB Garamond`, serif (heritage tone)
  - Body: `Inter`, sans-serif (legibility)
  - Monospace: `Fira Code` for chord diagrams
- **Grid & Layout**:
  - 12-column responsive grid with 16px base gutter.
  - Maximum content width 1280px; fluid breakpoints at 640/768/1024/1440.
- **Iconography**: Phosphor Icons set, two-tone usage aligned with primary/accent colors.

### Interaction Guidelines

- Buttons and interactive elements respect 44px touch targets.
- Focus states use high-contrast outlines; maintain visible focus for keyboard users.
- Motion reduced via `prefers-reduced-motion` media queries.
- Micro-interactions (hover, tap feedback) use timing functions `cubic-bezier(0.4,0,0.2,1)` with 150–250ms duration.

## 8. Responsive & Adaptive Patterns

- **Mobile-first**: vertical stacking of content, collapsible filter drawers, player fixed to bottom sheet.
- **Tablet**: two-column layouts for catalog filters and content cards.
- **Desktop**: persistent left filter rail, sticky right sidebar for chords/metadata.
- **Large screens**: additional context modules (e.g., timeline, related performances) appear.

## 9. Accessibility & Localization

- Semantic HTML elements for landmark regions (`header`, `nav`, `main`, `footer`).
- ARIA labels on embedded media players; transcripts available for lyrics view.
- Color contrast ratio ≥ 4.5:1 for text; 3:1 for large headings.
- Locale-aware formatting for dates, numbers, and cultural context notes.
- Continuous integration includes automated accessibility checks (axe-core, pa11y).

## 10. Performance Budget

- **Initial load**: <130 KB critical JS, <100 KB CSS (post-gzip).
- **Largest Contentful Paint**: <2.5s on 3G Fast baseline for song pages.
- **Cumulative Layout Shift**: <0.1 via reserved placeholders for media and ads.
- **Server-side caching**: Use `revalidateTag` for songs/performances to invalidate caches on updates.
- **Client optimizations**: Lazy-load embeddable players, prefetch related song pages on hover.

## 11. Tooling & Workflow

- Storybook for component development/non-regression visual testing.
- Tailwind `@apply` usage limited to composition; complex patterns extracted to components.
- ESLint + Stylelint enforce accessibility and best practices (jsx-a11y, tailwindcss plugin).
- Percy (or Chromatic) for visual regression tracking across breakpoints.

## 12. Future Enhancements

- **Personalization**: dynamic homepage modules based on listening history.
- **Offline mode** via service worker for saved collections and lyrics.
- **Native bridge**: align component APIs with potential React Native or Expo implementations.
- **Design tokens pipeline**: sync tokens to Figma and other platforms using Style Dictionary.

---

This guide should evolve with the product roadmap. Keep the component library and design tokens versioned, document changes in Storybook, and ensure cross-team alignment through regular design-engineering reviews.
