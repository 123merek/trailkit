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

1. Replace demo fallback metrics with fully persisted aggregate queries.
2. Add Clerk, Supabase Auth, or NextAuth for real user login.
3. Add background jobs for webhook processing after immediate 200 responses.
4. Add RevenueCat subscriber API sync after webhook receipt.
5. Build the first iOS SDK package.
6. Build the first Android SDK package.
7. Add custom-domain DNS TXT lookup before verification.
8. Add payout approval workflow and export history.
9. Add partner-facing read-only reports.
10. Interview 10 beta app teams and record attribution workflows.

## Commit Conventions

- `feat:` product or engineering feature.
- `fix:` bug fix.
- `docs:` docs-only change.
- `design:` visual and brand update.
- `test:` test-only change.
- `chore:` dependency, tooling, or repository maintenance.
