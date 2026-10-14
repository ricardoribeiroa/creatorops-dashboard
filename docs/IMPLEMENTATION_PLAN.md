# Implementation Plan — CreatorOps Dashboard v0.1

Each task lists its dependencies and the acceptance criteria (AC, see `docs/PRD.md`) it satisfies.

| #  | Task                                                                                       | Depends on | Done when                                                                     |
| -- | ------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------- |
| 1  | Scaffold Next.js (App Router, TS strict, ESLint, Tailwind v4) and add Vitest + Testing Library | —          | `npm run dev` serves the starter page; `npm test` runs.                       |
| 2  | Add scripts: `typecheck`, `test`, `validate` (lint + typecheck + test + build)             | 1          | `npm run validate` runs all gates.                                            |
| 3  | Define types in `src/types/campaign.ts` (`Campaign`, `CampaignStatus`, `Platform`, `CampaignKpis`) | 1   | Types compile under `strict`.                                                 |
| 4  | Create `src/data/campaigns.json` with realistic sample data covering every status          | 3          | ≥ 1 campaign per status; data matches PRD §5.                                 |
| 5  | Data access `src/lib/campaigns.ts`: runtime validation (`parseCampaigns`) + `getCampaigns()` | 3, 4     | Invalid records throw with a precise message; unit tests cover it (AC-3.2).   |
| 6  | KPI logic `src/lib/kpis.ts` (`computeKpis`) and formatters `src/lib/format.ts`             | 3          | Unit tests cover empty, single, mixed data (AC-1.2 – 1.6).                    |
| 7  | Status mapping `src/lib/campaign-status.ts` (`STATUS_META`)                                | 3          | Every `CampaignStatus` has label + classes; exhaustive by type (AC-2.3).      |
| 8  | Design tokens in `src/app/globals.css`; fonts and metadata in `layout.tsx`                 | 1          | Tokens match `docs/DESIGN_SYSTEM.md`; dark scheme works.                      |
| 9  | UI components: `Card`, `StatusBadge`, `KpiCard`, `KpiSection`, `CampaignCard`, `CampaignGrid` | 6, 7, 8  | Component tests pass; no raw colors in components.                            |
| 10 | Compose `src/app/page.tsx` (header → KPIs → campaigns)                                     | 5, 9       | Page renders KPIs then grid (AC-1.1, AC-2.1); page test passes.              |
| 11 | KPI ↔ data verification test computing expectations independently from the JSON          | 4, 6       | Test asserts rendered KPI text equals independent sums (AC-1.2 – 1.5).        |
| 12 | Validate: lint, typecheck, tests, production build, run server, check HTML at runtime      | 10, 11     | All gates green; results recorded in `docs/VALIDATION.md`.                   |

## Risks and decisions

- **Next.js 16 + Cache Components** are enabled by the scaffold. The JSON is a static import, so the page is
  fully prerendered without `"use cache"`. Revisit when a real data source arrives.
- **Runtime validation without a schema library** keeps dependencies minimal. Switch to Zod if the data model grows.
- **Number formatting** is pinned to `en-US` so server and client output never differ.
