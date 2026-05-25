# TrailKit

Track every app growth link from click to install to revenue.

TrailKit is a lightweight mobile attribution and payout infrastructure MVP for app teams. It helps teams create smart links for creators, affiliates, campaigns, emails, website buttons, QR codes, landing pages, and referral partners, then estimate which links drive installs, trials, subscriptions, purchases, renewals, revenue, and partner payouts.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Recharts
- Prisma ORM
- SQLite local fallback, PostgreSQL-ready schema shape
- Vercel-ready deployment

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run db:push
npm run db:seed
```

## Environment Variables

```bash
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
TRAILKIT_API_KEY="tk_test_replace_me"
TRAILKIT_REQUIRE_API_KEY="false"
IP_HASH_SALT="replace-with-random-secret"
CLICK_RETENTION_DAYS="180"
REVENUECAT_WEBHOOK_AUTH="Bearer replace_with_revenuecat_webhook_secret"
```

For production, use a managed PostgreSQL database and update `prisma/schema.prisma` provider to `postgresql` before creating production migrations.

## MVP Routes

- `/`: public landing site.
- `/dashboard`: overview dashboard.
- `/dashboard/links`: smart link list and prototype creator.
- `/dashboard/links/:id`: link detail page.
- `/dashboard/partners`: partner payout estimates.
- `/dashboard/events`: attribution event stream.
- `/dashboard/settings`: app and integration settings.
- `/r/demo-creator`: demo smart link redirect.

## API Routes

- `GET /api/links`
- `POST /api/links`
- `GET /api/links/:id`
- `POST /api/click/:slug`
- `POST /api/events/first-open`
- `POST /api/events/revenue`
- `POST /api/webhooks/revenuecat`
- `POST /api/imports/revenue`
- `GET /api/links/:id/qr`
- `GET /api/payouts/export`
- `GET /api/domains`
- `POST /api/domains`
- `POST /api/domains/:id/verify`
- `GET /api/sdk/handshake`
- `GET /api/dashboard`
- `GET /api/partners`
- `GET /api/events`

## Deployment

Vercel import settings:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: Next.js default

Production environment variables:

```bash
DATABASE_URL="<managed-postgres-url>"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
TRAILKIT_API_KEY="<generated-api-key>"
TRAILKIT_REQUIRE_API_KEY="true"
IP_HASH_SALT="<random-secret>"
CLICK_RETENTION_DAYS="180"
REVENUECAT_WEBHOOK_AUTH="Bearer <revenuecat-webhook-secret>"
```

CLI deployment:

```bash
npm install -g vercel
vercel login
vercel link
vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add TRAILKIT_API_KEY production
vercel --prod
```

## MVP Limitations

- Demo data remains as a fallback when no writable database is available.
- Smart links, clicks, first-open events, revenue events, CSV imports, custom domains, and payout estimates are Prisma-backed locally.
- Click tracking is privacy-conscious; it stores a salted IP hash with retention metadata and does not use fingerprinting.
- First-open attribution requires a future mobile SDK or durable event integration.
- Revenue matching is an estimate until real app events and customer IDs are connected.
- Payouts are estimates for review, not automated money movement.
- QR generation is available for smart links, with SVG and PNG output.

## Docs

- [PRD](docs/PRD.md)
- [Roadmap](docs/ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [GitHub setup](docs/GITHUB_SETUP.md)
- [Brand system](docs/BRAND.md)
- [Design prompts](docs/DESIGN_PROMPTS.md)
- [SDK handshake](docs/SDK_HANDSHAKE.md)
