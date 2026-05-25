# TrailKit Architecture

## System Overview

TrailKit is a Next.js App Router application with a marketing site, MVP dashboard, API route handlers, Prisma schema, and seeded demo data. The prototype uses local demo data for stable rendering and a Prisma SQLite database for local schema validation and seed workflows. The schema is intentionally portable so it can move to PostgreSQL for production.

## Data Flow

1. A founder creates a smart link with source, campaign, partner, and app-store destinations.
2. A user clicks `/r/[slug]`.
3. TrailKit records a privacy-conscious click event with user agent, referrer, destination, country placeholder, and hashed IP placeholder.
4. TrailKit routes the user to the iOS App Store, Google Play, or fallback URL based on likely device.
5. A future SDK or first-open API sends a `first_open` event with an anonymous user ID and smart link context.
6. Revenue events arrive from RevenueCat, Adapty, Apphud, Superwall, Stripe, manual import, or API.
7. TrailKit matches revenue to the attributed smart link where possible.
8. Payout rules calculate partner payout estimates for review and export.

## MVP Attribution Limitations

- Without a mobile SDK, TrailKit cannot reliably connect every app-store click to first open.
- The MVP avoids invasive fingerprinting and does not attempt to bypass ATT.
- Redirect user-agent routing can be wrong for some browsers, in-app browsers, and desktop-to-mobile journeys.
- Revenue matching is an estimate unless the app sends durable attribution IDs or partner metadata back with events.
- Payout calculations are estimates until approved by the app team.

## What Requires a Mobile SDK

- Reliable first-open attribution after app-store install.
- Deferred deep linking from app install into a specific screen.
- Device-level install metadata under platform privacy limits.
- Persisted anonymous attribution IDs.
- Offline event buffering and retry.

## What Can Be Simulated In The MVP

- Smart link creation.
- Click and destination capture.
- Store routing.
- First-open, trial, subscription, purchase, renewal, and payout events.
- Revenue attribution and payout estimates from seeded data.
- RevenueCat-ready webhook shape.

## Intentionally Not Solved Yet

- Probabilistic device fingerprinting.
- Automated payouts.
- SKAdNetwork reporting.
- Full fraud detection.
- Enterprise permissions.
- Creator relationship management.
- UGC content operations.

## API Endpoint List

- `GET /api/links`: list smart links with metrics.
- `POST /api/links`: create a prototype smart link.
- `GET /api/links/:id`: fetch a smart link detail.
- `POST /api/click/:slug`: record a click and return routing destination.
- `POST /api/events/first-open`: accept a first-open event.
- `POST /api/events/revenue`: accept a revenue event.
- `POST /api/webhooks/revenuecat`: accept RevenueCat webhooks, verify the configured Authorization header, and dedupe by RevenueCat event id.
- `POST /api/imports/revenue`: import revenue events from CSV.
- `GET /api/links/:id/qr`: generate SVG or PNG QR codes for smart links.
- `GET /api/payouts/export`: export payout estimates as CSV.
- `GET /api/domains`: list branded-link custom domains.
- `POST /api/domains`: create a custom domain verification record.
- `POST /api/domains/:id/verify`: mark a custom domain verified in the MVP flow.
- `GET /api/sdk/handshake`: return the first mobile SDK attribution handshake.
- `GET /api/dashboard`: return funnel, revenue, and payout metrics.
- `GET /api/partners`: return partner payout summaries.
- `GET /api/events`: return event stream.

## Database Schema Explanation

- Workspace owns apps, partners, campaigns, and API keys.
- App stores store URLs, custom domain placeholders, and integration settings.
- SmartLink belongs to an app and optionally a partner and campaign.
- Click records click metadata and destination decisions.
- AttributionEvent stores lifecycle events, including install, trial, subscription, purchase, renewal, and payout calculated.
- RevenueEvent stores monetization events matched to links.
- PayoutRule defines commission or fixed payout logic per partner.
- PayoutEstimate stores computed payout amounts and review status.

## Deployment Architecture

- Next.js app deployed to Vercel.
- PostgreSQL database from Neon, Supabase, Vercel Postgres, or another managed provider.
- Prisma migrations run during setup, not in every request.
- API routes run as serverless functions.
- Custom domains can point to Vercel and later be used for branded smart links.
- Auth can be added at the dashboard boundary with Clerk, Supabase Auth, or NextAuth.
