# CreatorOps Dashboard — Product Requirements Document

| Field   | Value                         |
| ------- | ----------------------------- |
| Status  | Approved for v0.1 (initial)   |
| Owner   | CreatorOps                    |
| Updated | 2026-10-14                    |

## 1. Problem

Creator-marketing teams run many campaigns at once across creators and platforms. Today, answering simple
questions — *how many campaigns are running, how much budget is committed, how many views have we earned* —
requires opening spreadsheets and adding numbers by hand. That is slow and error-prone.

## 2. Goal

Give the team a single, read-only screen that answers those questions at a glance and lists every campaign
with its current status.

### Success criteria

- A user can read the four headline KPIs within 5 seconds of opening the page.
- Every KPI is derived from the campaign data, never typed by hand, so the numbers cannot drift.
- A user can scan campaign status by color **and** by text label.
- The page is usable on a 360 px phone and on a 1440 px desktop.

## 3. Users

| Persona              | Need                                                        |
| -------------------- | ----------------------------------------------------------- |
| Campaign manager     | See which campaigns are live, paused, or finished.          |
| Marketing lead       | See portfolio totals (budget, views) for status reporting.  |

## 4. Scope

### In scope (v0.1)

1. **KPI section** with four metrics:
   - **Total Campaigns** — count of all campaigns.
   - **Active Campaigns** — count of campaigns whose status is `active`.
   - **Total Views** — sum of `views` across all campaigns.
   - **Total Budget** — sum of `budget` across all campaigns (USD).
2. **Campaign overview** — responsive grid of cards below the KPIs. Each card shows:
   - title, short description, current status, and a color-coded status badge.
   - Secondary details (creator, platform, budget, views) are allowed as supporting context.
3. **Data** — campaigns stored in a local JSON file (`src/data/campaigns.json`) with TypeScript types.
4. Light and dark color schemes following the operating-system preference.

### Out of scope (v0.1)

- Backend, API, database, or authentication.
- Creating, editing, or deleting campaigns.
- Filtering, sorting, search, pagination, charts, date-range selection.
- Multi-currency support (all budgets are USD).
- Internationalization (UI copy is English; numbers use `en-US` formatting).

## 5. Data model

| Field         | Type                                                                 | Notes                                    |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| `id`          | `string`                                                             | Unique, stable.                          |
| `title`       | `string`                                                             | Non-empty.                               |
| `description` | `string`                                                             | Short, 1–2 sentences.                    |
| `status`      | `"draft" \| "scheduled" \| "active" \| "paused" \| "completed"`      | Drives badge color and "Active" KPI.     |
| `creator`     | `string`                                                             | Primary creator name.                    |
| `platform`    | `"YouTube" \| "Instagram" \| "TikTok" \| "Twitch" \| "X"`            |                                          |
| `budget`      | `number`                                                             | USD, whole dollars, `>= 0`.              |
| `views`       | `number`                                                             | Integer, `>= 0`.                         |
| `startDate`   | `string`                                                             | ISO date `YYYY-MM-DD`.                   |
| `endDate`     | `string`                                                             | ISO date `YYYY-MM-DD`, `>= startDate`.   |

Invalid data must fail loudly at build/render time rather than render wrong numbers.

## 6. Functional requirements and acceptance criteria

### FR-1 KPI section

- **AC-1.1** Four KPI cards render in this order: Total Campaigns, Active Campaigns, Total Views, Total Budget.
- **AC-1.2** Total Campaigns equals the number of records in the JSON file.
- **AC-1.3** Active Campaigns equals the number of records with `status === "active"`.
- **AC-1.4** Total Views equals the sum of `views`, formatted with thousands separators.
- **AC-1.5** Total Budget equals the sum of `budget`, formatted as USD currency with no decimals.
- **AC-1.6** KPI values are computed by a pure, unit-tested function; no KPI number is hard-coded in UI code.

### FR-2 Campaign overview

- **AC-2.1** One card renders per campaign, below the KPI section.
- **AC-2.2** Each card shows title, description, and a status badge containing the status **text**.
- **AC-2.3** Each status maps to exactly one color, identical everywhere it appears.
- **AC-2.4** Grid is 1 column on small screens, 2 on medium, 3 on large; no horizontal scroll at 360 px.
- **AC-2.5** When there are no campaigns, an empty-state message is shown instead of an empty grid.

### FR-3 Data

- **AC-3.1** Data lives in `src/data/campaigns.json`; no network calls are made.
- **AC-3.2** TypeScript types describe every field; the JSON is validated at load time.

### Non-functional requirements

- **Accessibility:** WCAG 2.2 AA color contrast; status never conveyed by color alone; semantic landmarks and
  headings; works with keyboard and screen readers.
- **Performance:** Page is statically prerendered; no client-side JavaScript is required to display data.
- **Quality:** `lint`, `typecheck`, `test`, and `build` all pass.

## 7. Future considerations

Filtering by status/platform, sorting, campaign detail pages, a real data source behind a typed repository
function, and trend charts. The data-access layer (`src/lib/campaigns.ts`) is the seam for these changes.
