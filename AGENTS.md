<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — CreatorOps Dashboard

Guidance for humans and coding agents working in this repository. Read this file, `docs/PRD.md`, and
`docs/DESIGN_SYSTEM.md` before changing code.

## Stack

- **Next.js 16** (App Router, `cacheComponents` + `partialPrefetching` enabled), **React 19**, **TypeScript** (`strict`).
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`.
- **Vitest** + **React Testing Library** (jsdom) for unit and component tests.
- **ESLint 9** flat config with `eslint-config-next` (core-web-vitals + typescript).

## Commands

| Command             | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Local dev server at http://localhost:3000            |
| `npm run lint`      | ESLint                                               |
| `npm run typecheck` | `tsc --noEmit`                                       |
| `npm test`          | Vitest, single run                                   |
| `npm run build`     | Production build (prerenders the dashboard)          |
| `npm run validate`  | lint → typecheck → test → build. **Must pass before you finish.** |

## Architecture

```
src/
  app/                 Routes (App Router). layout.tsx, page.tsx, globals.css (design tokens)
  components/          Feature components (KpiSection, CampaignGrid, CampaignCard, StatusBadge, KpiCard)
    ui/                Generic primitives (Card)
  data/campaigns.json  Local campaign data (v0.1 source of truth)
  lib/                 Pure logic: campaigns.ts (load + validate), kpis.ts, format.ts, campaign-status.ts
  types/               Shared domain types (campaign.ts)
tests/                 Vitest tests mirroring src/ (lib/, components/, app/)
docs/                  PRD, design system, implementation plan, validation report
```

Data flow: `campaigns.json` → `getCampaigns()` (validates) → `page.tsx` → `computeKpis()` → presentational components.

- UI components never import JSON directly; they receive typed props. Only `src/lib/campaigns.ts` reads data.
- Business logic (KPIs, formatting, status mapping) lives in `src/lib` as pure functions with unit tests.
- When a backend arrives, replace the body of `getCampaigns()`; components should not change.

## Next.js conventions

- Default to **Server Components**. Add `"use client"` only for state, effects, or browser APIs, and keep the
  client boundary as low in the tree as possible.
- With Cache Components, uncached async work must be inside `<Suspense>` or cached with `"use cache"` +
  `cacheLife`. Static imports (like the JSON today) need neither. Check the docs in `node_modules/next/dist/docs/`.
- Use the Metadata API in `layout.tsx`/`page.tsx`; fonts via `next/font`; images via `next/image`.
- Use the `@/*` import alias for anything under `src/`.

## React and TypeScript standards

- `strict` mode; no `any`, no non-null assertions (`!`) without a comment explaining why.
- Model finite states as string-literal unions (`CampaignStatus`) and make mappings exhaustive with
  `Record<Union, …>` so adding a status is a compile error until handled.
- Props are typed with a named `type XxxProps`; export components as named function declarations.
- Components are small, pure, and presentational; derive values, don't store them.
- Stable `key`s from domain IDs, never array indexes.
- File names are `kebab-case.tsx`; components are `PascalCase`.
- Format numbers through `src/lib/format.ts` (pinned to `en-US`), never inline `toLocaleString()`.

## Design system rules

- Use **only** tokens from `docs/DESIGN_SYSTEM.md` (`bg-surface`, `text-muted`, `border-border`, `bg-status-active-bg`, …).
  No raw hex values and no Tailwind palette colors in components.
- Status color/label comes **only** from `STATUS_META` in `src/lib/campaign-status.ts`.
- Never convey meaning with color alone; always pair with text.
- Mobile-first responsive classes; verify at 360 px, 768 px, and 1280 px.
- Semantic HTML first: landmarks, ordered headings, lists for collections, `<dl>` for label/value pairs.

## Testing expectations

- Every function in `src/lib` has unit tests, including edge cases (empty input, invalid data).
- Every component has at least one render test asserting user-visible output (query by role/text, not class names),
  except purely structural primitives.
- KPI tests must compute expected values independently of `computeKpis` (no circular assertions).
- Tests live in `tests/` mirroring `src/`, named `*.test.ts(x)`.

## Definition of done

1. `npm run validate` passes with zero errors and zero warnings you introduced.
2. New behavior is covered by tests.
3. Docs updated when scope, data model, or design tokens change.
4. UI checked in a browser (light and dark, mobile and desktop) for visual changes.
