# CreatorOps Design System

A small, token-driven system for a calm, professional operations dashboard. Tokens are defined once in
`src/app/globals.css` (CSS custom properties exposed to Tailwind v4 through `@theme inline`) and consumed as
Tailwind utilities such as `bg-surface`, `text-muted`, `border-border`.

**Rule:** components never use raw hex values or Tailwind palette colors (`bg-green-500`). Use tokens only.

## 1. Principles

1. **Data first.** Numbers are the hero; chrome stays quiet.
2. **Never color alone.** Every status color is paired with a text label.
3. **One meaning, one color.** A status has the same color everywhere.
4. **Responsive by default.** Mobile layout is the baseline; larger screens add columns.

## 2. Color

### Neutral / surface tokens

| Token               | Light     | Dark      | Usage                                  |
| ------------------- | --------- | --------- | -------------------------------------- |
| `--color-canvas`    | `#f6f7f9` | `#0b0d12` | Page background                        |
| `--color-surface`   | `#ffffff` | `#141821` | Cards                                  |
| `--color-border`    | `#e3e6eb` | `#262c38` | Card borders, dividers                 |
| `--color-fg`        | `#111827` | `#eef1f6` | Primary text, KPI values               |
| `--color-muted`     | `#5b6473` | `#9aa3b2` | Secondary text, labels                 |
| `--color-accent`    | `#4f46e5` | `#8b85ff` | Brand mark, focus ring                 |

Contrast: `fg` on `surface` ≥ 15:1; `muted` on `surface` ≥ 5.5:1 in both schemes (AA for body text).

### Status tokens

Each status has a background (`-bg`), foreground (`-fg`) and dot (`-dot`) token. Badge text meets ≥ 4.5:1
against its background in both schemes.

| Status      | Hue    | Light bg / fg         | Dark bg / fg          | Meaning                      |
| ----------- | ------ | --------------------- | --------------------- | ---------------------------- |
| `active`    | Green  | `#e7f6ec` / `#166534` | `#11291b` / `#7ee2a1` | Live and delivering          |
| `scheduled` | Blue   | `#e6f0fd` / `#1d4ed8` | `#0f2038` / `#8ab8ff` | Approved, not started        |
| `paused`    | Amber  | `#fdf3e1` / `#92400e` | `#2e2210` / `#f6c66b` | Temporarily stopped          |
| `completed` | Violet | `#f1edfd` / `#5b21b6` | `#221a3a` / `#c3b2ff` | Finished                     |
| `draft`     | Gray   | `#eef0f3` / `#374151` | `#1f242e` / `#c4cad4` | Being planned                |

The mapping lives in one place: `src/lib/campaign-status.ts` (`STATUS_META`).

## 3. Typography

Font: **Geist Sans** (via `next/font`), tabular numerals (`tabular-nums`) for every metric.

| Role          | Class                                              | Size / line |
| ------------- | -------------------------------------------------- | ----------- |
| Page title    | `text-2xl sm:text-3xl font-semibold tracking-tight` | 24–30 px    |
| Section title | `text-lg font-semibold`                            | 18 px       |
| KPI value     | `text-3xl font-semibold tabular-nums`              | 30 px       |
| KPI label     | `text-sm font-medium text-muted`                   | 14 px       |
| Card title    | `text-base font-semibold`                          | 16 px       |
| Body          | `text-sm text-muted`                               | 14 px       |
| Badge / meta  | `text-xs font-medium`                              | 12 px       |

## 4. Spacing, radius, elevation

- Spacing follows Tailwind's 4 px scale. Use `gap-4` (16 px) inside grids, `p-5` (20 px) card padding,
  `gap-10` (40 px) between page sections.
- Page container: `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`.
- Radius: cards `rounded-xl` (12 px), badges `rounded-full`.
- Elevation: 1 px border plus `shadow-sm`; no heavy shadows.

## 5. Layout and breakpoints

| Breakpoint | Width     | KPI grid  | Campaign grid |
| ---------- | --------- | --------- | ------------- |
| base       | < 640 px  | 1 column  | 1 column      |
| `sm`       | ≥ 640 px  | 2 columns | 1 column      |
| `md`       | ≥ 768 px  | 2 columns | 2 columns     |
| `lg`       | ≥ 1024 px | 4 columns | 3 columns     |

## 6. Components

| Component       | Path                                  | Responsibility                                       |
| --------------- | ------------------------------------- | ---------------------------------------------------- |
| `Card`          | `src/components/ui/card.tsx`          | Surface primitive (border, radius, padding).         |
| `StatusBadge`   | `src/components/status-badge.tsx`     | Dot + label pill colored by `CampaignStatus`.        |
| `KpiCard`       | `src/components/kpi-card.tsx`         | Label, formatted value, optional hint.               |
| `KpiSection`    | `src/components/kpi-section.tsx`      | Section heading + responsive KPI grid.               |
| `CampaignCard`  | `src/components/campaign-card.tsx`    | Title, badge, description, meta (creator, budget…).  |
| `CampaignGrid`  | `src/components/campaign-grid.tsx`    | Section heading + responsive grid + empty state.     |

Patterns:

- Sections use `<section aria-labelledby>` with a visible `<h2>`.
- Lists of cards are `<ul role="list">` / `<li>`.
- KPI cards use `<dl>`-style semantics (`<dt>` label, `<dd>` value).
- Focus-visible ring: `outline-2 outline-offset-2 outline-accent` on any future interactive element.

## 7. Accessibility checklist

- [ ] Status shown as text, not only color.
- [ ] Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI shapes.
- [ ] One `<h1>`, ordered headings, `<main>` landmark.
- [ ] No horizontal scroll at 360 px; text reflows at 200 % zoom.
- [ ] Respects `prefers-color-scheme` and `prefers-reduced-motion` (no motion beyond hover color).
