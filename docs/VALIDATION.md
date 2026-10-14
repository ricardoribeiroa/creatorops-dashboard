# Validation Report — CreatorOps Dashboard v0.1

Date: 2026-10-14 · Node 22.16.0 · npm 10.9.2 · Next.js 16.4.1 · React 19.3.0

## 1. Quality gates (`npm run validate`)

| Gate        | Command             | Result                                              |
| ----------- | ------------------- | --------------------------------------------------- |
| Lint        | `npm run lint`      | ✅ No issues                                         |
| Type check  | `npm run typecheck` | ✅ No errors (`strict`)                              |
| Tests       | `npm test`          | ✅ 9 files, 29 tests passed                          |
| Build       | `npm run build`     | ✅ Compiled; `/` prerendered as static content (○)   |

## 2. KPI accuracy

Expected values were computed **independently** of the app code (Python over `src/data/campaigns.json`),
then compared to (a) the rendered page in tests and (b) the HTML served by `next start`.

| KPI              | Independent calculation | Rendered by production server |
| ---------------- | ----------------------- | ----------------------------- |
| Total Campaigns  | 12                      | 12                            |
| Active Campaigns | 4                       | 4                             |
| Total Views      | 6,599,830               | 6,599,830                     |
| Total Budget     | $345,000                | $345,000                      |

Also verified in the served HTML: 12 campaign `<article>` cards, and a badge for each of the 5 statuses.
Automated test `tests/app/page.test.tsx` reads the JSON from disk and re-derives each KPI without using
`getCampaigns()` or `computeKpis()`, so the check is not circular.

## 3. Acceptance criteria

| AC          | Evidence                                                                          | Status |
| ----------- | --------------------------------------------------------------------------------- | ------ |
| AC-1.1      | `kpi-section.test.tsx` asserts label order                                        | ✅      |
| AC-1.2–1.5  | `page.test.tsx` + served-HTML check (§2)                                          | ✅      |
| AC-1.6      | `computeKpis` is pure and unit-tested (`kpis.test.ts`); UI has no hard-coded KPIs | ✅      |
| AC-2.1      | `page.test.tsx`: 12 articles after the KPI heading                                | ✅      |
| AC-2.2      | `campaign-card.test.tsx`, `status-badge.test.tsx` (text label present)            | ✅      |
| AC-2.3      | `campaign-status.test.ts`: one distinct token set per status                      | ✅      |
| AC-2.4      | Screenshots: 1 column at 360 px, 2 at 768 px, 3 at 1440 px; no horizontal scroll  | ✅      |
| AC-2.5      | `campaign-grid.test.tsx` empty-state test                                         | ✅      |
| AC-3.1/3.2  | JSON-only data source; `campaigns.test.ts` covers validation errors               | ✅      |

## 4. Visual and accessibility checks

Screenshots taken with headless Chrome against the production build:

- `docs/validation/desktop-dark-1440.png` — desktop, dark scheme
- `docs/validation/mobile-360-tablet-768-light.png` — 360 px and 768 px viewports, light scheme

WCAG contrast ratios for the design tokens, computed with the WCAG 2.x formula:

| Pair                      | Light  | Dark   |
| ------------------------- | ------ | ------ |
| `fg` on `surface`         | 17.74  | 15.69  |
| `muted` on `surface`      | 5.97   | 6.98   |
| `muted` on `canvas`       | 5.57   | 7.64   |
| `accent` on `canvas`      | 5.87   | 6.38   |
| Badge: active             | 6.38   | 9.79   |
| Badge: scheduled          | 5.82   | 8.08   |
| Badge: paused             | 6.44   | 9.77   |
| Badge: completed          | 7.82   | 8.72   |
| Badge: draft              | 9.03   | 9.44   |

All text pairs exceed the AA threshold of 4.5:1.

## 5. Known limitations

- **Not checked with a screen reader or automated a11y tool** (axe/Lighthouse). The semantics are covered
  by role-based tests only.
- **No E2E test suite.** The visual checks were manual screenshots, not repeatable Playwright tests. Playwright's
  bundled Chromium could not run in this WSL environment (missing `libnspr4`, which needs sudo to install).
- **Dark mode follows the OS setting only**; there is no manual toggle (out of scope for v0.1).
- **`npm audit` reports 5 high-severity advisories**, all for `braces@3.0.3`, a dev-only transitive dependency of
  `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch`. It does not ship in the
  production bundle. `npm audit fix --force` would downgrade the ESLint config, so it was not applied; it should
  clear on a future `eslint-config-next` release.
- **Sample data is fictional** and used only for demonstration.
