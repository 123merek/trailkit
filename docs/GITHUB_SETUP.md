# GitHub Setup

## Repo Setup

```bash
git init
git add .
git commit -m "feat: launch TrailKit MVP"
gh repo create trailkit --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` when ready to launch publicly.

## Branching Strategy

- `main`: production-ready branch.
- `feat/*`: feature work.
- `fix/*`: bug fixes.
- `docs/*`: documentation updates.
- `chore/*`: maintenance.

## Issue Labels

- `product`
- `design`
- `frontend`
- `backend`
- `attribution`
- `integrations`
- `docs`
- `customer-validation`
- `bug`
- `launch`

## Milestones

- `Private Beta`
- `Sellable MVP`
- `SDK Alpha`
- `Revenue Integrations`
- `Payout Exports`

## Suggested Project Board Columns

- Inbox
- Shaping
- Ready
- In Progress
- Review
- Validate With Users
- Done

## First 10 GitHub Issues

1. Add persistent smart link creation backed by Prisma.
2. Implement authenticated workspace boundary.
3. Add real click write path with IP hashing and retention policy.
4. Build RevenueCat webhook ingestion and signature verification.
5. Design first mobile SDK attribution handshake.
6. Add QR code generation and download.
7. Add CSV import for manual revenue matching.
8. Add payout export by partner and date range.
9. Add custom domain setup flow for branded links.
10. Interview 10 beta app teams and record attribution workflows.

## Commit Conventions

- `feat:` product or engineering feature.
- `fix:` bug fix.
- `docs:` docs-only change.
- `design:` visual and brand update.
- `test:` test-only change.
- `chore:` dependency, tooling, or repository maintenance.
