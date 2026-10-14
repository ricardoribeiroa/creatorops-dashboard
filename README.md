# CreatorOps Dashboard

A dashboard for creator marketing campaigns. It shows four KPIs (total campaigns, active campaigns, total views,
total budget) and a responsive grid of campaign cards with color-coded status badges.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. In v0.1, data comes from a
local JSON file (`src/data/campaigns.json`).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Production build                             |
| `npm start`         | Serve the production build                   |
| `npm run lint`      | ESLint                                       |
| `npm run typecheck` | TypeScript type check                        |
| `npm test`          | Unit and component tests (Vitest)            |
| `npm run validate`  | Lint, type check, test, and build            |

## Documentation

- [Product requirements](docs/PRD.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Validation report](docs/VALIDATION.md)
- [Contributor and agent guide](AGENTS.md)

## Editing campaign data

Edit `src/data/campaigns.json`. Each record is validated at build time (see `src/lib/campaigns.ts`). An invalid
status, a negative budget, a duplicate ID, or an end date before the start date fails the build with a clear
error, so the dashboard never shows wrong totals.
