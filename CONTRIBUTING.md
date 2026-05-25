# Contributing to TrailKit

TrailKit is an MVP for mobile attribution and payout infrastructure. Keep changes focused on smart links, attribution events, revenue matching, payout estimates, and launch-readiness.

## Development

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Quality Bar

- Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` before shipping.
- Keep UI components responsive and accessible.
- Prefer explicit data types and small pure functions for attribution logic.
- Do not add creator CRM, UGC workflow, or enterprise MMP scope without a validated product reason.

## Commit Style

Use concise conventional commits:

- `feat: add smart link redirect`
- `fix: handle missing smart link`
- `docs: update attribution limitations`
- `chore: refresh seed data`
