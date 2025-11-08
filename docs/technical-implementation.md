# Rusongs.org Website Technical Implementation

This document describes the architecture, components, and processes behind the Rusongs.org marketing site. The project is built with Next.js 16 (App Router) and renders Markdown-based documentation into polished web pages.

## 1. Architecture and Rendering

- **Framework**: Next.js 16 with App Router and React strict mode.
- **Rendering mode**: all routes are statically pre-rendered during `next build`. In a typical Vercel deployment, pages are served from the CDN.
- **Output**: `next.config.ts` sets `output: "standalone"` to produce a self-contained Node.js artifact with minimal dependencies.
- **Fonts**: Geist Sans and Geist Mono are embedded via `next/font/google`, so they work during SSG without external requests.

## 2. Project Structure

```
.
├── app/                         # App Router: pages, layout, global styles
│   ├── layout.tsx               # Shared shell, navigation, footer
│   ├── page.tsx                 # Homepage (teaser of product narrative)
│   ├── overview/page.tsx        # Renders docs/website/overview.md
│   └── tech/page.tsx            # Renders docs/website/tech.md
├── docs/
│   ├── website/overview.md      # Product brief
│   ├── website/tech.md          # Technical stack
│   └── technical-implementation.md  # (this document)
├── lib/markdown.ts              # Markdown → HTML renderer
├── public/                      # Static assets
├── vercel.json                  # Deployment configuration
├── package.json                 # Scripts and dependencies
└── tsconfig.json                # TypeScript configuration
```

## 3. Frontend Layer

### 3.1 App Router
- Each page is a server component that loads content during the build.
- Routes (`app/**/page.tsx`) export `metadata` objects to control `<title>` and description tags.
- 404 rendering is handled automatically by the App Router’s generated `_not-found`.

### 3.2 Layout and Navigation
- `app/layout.tsx` defines the shared header, footer, and applies global classes.
- The menu is derived from a `navigation` array, simplifying future additions.
- The footer links to documentation sections and credits Vercel as the hosting platform.

### 3.3 Homepage
- `app/page.tsx` distills the key points from the product overview:
  - Value proposition.
  - Audience segments.
  - Core feature set.
  - CTAs leading to `overview` and `tech` pages.
- Styling relies on Tailwind CSS v4 utilities combined with custom CSS variables that match the design palette.

## 4. Markdown Rendering

- `lib/markdown.ts` encapsulates reading and transforming Markdown files.
- Plugins in use:
  - `remark-gfm` for GitHub Flavored Markdown (tables, task lists).
  - `remark-slug` to inject `id` attributes on headings (currently cast via `slug as any` to avoid type mismatches).
  - `remark-html` to convert the AST to an HTML string.
- `renderMarkdown` accepts a path relative to `docs/` and returns the HTML string along with the first-level heading (reserved for future use).
- Security: documentation is repository-controlled. If untrusted content is ever ingested, extend the pipeline with `rehype-sanitize`.

## 5. Styling

- Global styles in `app/globals.css` import Tailwind CSS v4 through `@import "tailwindcss"`.
- Palette, background, and typography are exposed as CSS variables:
  - `--color-primary`, `--color-secondary`, `--color-background`, `--color-text-*`, etc.
- The `.markdown` class customizes typography for rendered HTML (headings, lists, tables, code blocks, blockquotes).
- Code blocks use a dark background and the Geist Mono font for readability.

## 6. Content Workflow

- Source Markdown lives in `docs/website`. To add a new section:
  1. Create a Markdown file inside `docs/website`.
  2. Add a route in `app/<slug>/page.tsx` that calls `renderMarkdown("<path>")`.
  3. Append the link to the `navigation` array.
- For automatic table-of-contents support, post-process the generated HTML or introduce an additional plugin in the pipeline.

## 7. Build and Deployment

- **ESLint**: `npm run lint` with `--max-warnings=0` to enforce clean builds.
- **Production build**: `npm run build` produces `.next` and outputs the list of static routes.
- **Start**: `npm run start` runs the standalone server bundle.
- **Vercel**:
  - `vercel.json` pins install, build, and dev commands.
  - Regions: `arn1`, `sfo1`, `gru1` to cover Europe, US West, and South America.
  - Steps: connect the repository, confirm build command/output directory (`.next`).
  - No environment variables are required for the static documentation flow.

## 8. Local Development

1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

Enable ESLint and TypeScript integration in the editor for fast feedback.

## 9. Quality and Testing

- **Linting**: ESLint (Next.js 16 + React 19 config) is run locally and can be enforced in CI.
- **Build validation**: `next build` ensures type correctness and static generation success.
- **Potential future checks**:
  - Visual regression testing (Chromatic or Playwright).
  - Accessibility audits (axe-core or Next.js built-in tools).
  - Playwright integration tests for navigation paths.

## 10. Dependency Management and Tailwind v4

- Tailwind CSS 4 is enabled via `@import "tailwindcss"`.
- `postcss.config.mjs` is generated by `@tailwindcss/postcss`.
- Add a `tailwind.config.ts` if advanced theming or plugin customization becomes necessary (not required at present).

## 11. Security and Performance

- Static output eliminates common SSR pitfalls.
- `poweredByHeader: false` hides the `X-Powered-By` header.
- `next/font` reduces external requests by bundling fonts.
- When introducing dynamic data, ensure client components receive serializable props only.

## 12. Future Enhancements

- Auto-generate a table of contents for long-form documents.
- Support multiple documentation bundles via `generateStaticParams`.
- Integrate a CMS (e.g., GitHub CMS or MDX-based workflows) when the number of pages grows.
- Introduce accessibility and visual regression test suites.
- Expand localization beyond Russian/English with Next.js i18n routing.

---

This document acts as an onboarding reference for developers and the infrastructure team. Update it whenever the architecture evolves to keep a shared understanding of how the Rusongs.org site is delivered.
