# TrailKit PRD

## Product Name

TrailKit

## One-Line Description

TrailKit helps app teams create smart links and track which links drive installs, trials, subscriptions, revenue, and partner payouts.

## Problem

Small app teams often share app links through creators, affiliates, emails, QR codes, landing pages, paid UGC, and website buttons, but their reporting ends at clicks or app-store opens. Enterprise MMPs are powerful but heavy, creator tools focus on workflow, and affiliate tools are usually web-first. The result is spreadsheet matching, unclear creator ROI, and payout calculations that are slow to trust.

## Target Users

- Indie app founders running creator, affiliate, email, website, and QR campaigns.
- Small growth teams at subscription apps that need install-to-revenue visibility.
- Mobile agencies that manage link performance and payout reports for multiple apps.
- Operators who want a lightweight alternative before committing to a full MMP.

## ICP

Subscription or commerce-enabled mobile apps with $10k to $500k monthly revenue, one to ten growth operators, and active acquisition through creators, affiliates, lifecycle email, owned web, or referral partners.

## Jobs To Be Done

- Create one trackable smart link for every growth source.
- Route users to the right app store or fallback page.
- Understand which links lead to installs, trials, subscriptions, purchases, renewals, and revenue.
- Estimate partner payouts without building a spreadsheet system.
- Validate channels before adopting a heavier mobile measurement platform.

## Core Promise

Replace scattered links, messy spreadsheets, and bloated MMP workflows with one lightweight system for app growth attribution.

## MVP Scope

- Smart link builder with source type, campaign, partner, and destination fields.
- Public redirect route with privacy-conscious click tracking.
- Dashboard for clicks, store opens, installs, trials, subscriptions, revenue, and estimated payouts.
- Link detail view with funnel metrics, timeline, and payout estimate.
- Partner payout summary.
- Event stream for click, store_open, first_open, trial_started, subscription_started, renewal, purchase, and payout_calculated.
- API route skeletons for links, clicks, first-open events, revenue events, dashboard metrics, partners, and events.
- Prisma schema and seed data for local demos.

## Non-Goals

- Creator CRM workflows, content approvals, negotiation tracking, or UGC asset management.
- Full enterprise MMP replacement with probabilistic attribution, fingerprinting, SKAdNetwork modeling, or advanced fraud scoring.
- RevenueCat-only architecture. RevenueCat is one supported event source, not the product boundary.
- Automated money movement in the MVP.
- Guaranteed or perfect attribution claims.

## Feature Requirements

- Users can view a dashboard with core funnel and revenue metrics.
- Users can list smart links and create a prototype link from the UI.
- Users can open a link detail page with conversion, revenue, timeline, and payout context.
- Users can inspect partner payout estimates by partner and status.
- Users can inspect an event stream across clicks, installs, revenue, and payout estimates.
- Users can configure app URLs, API key placeholder, RevenueCat webhook placeholder, and SDK status placeholder.
- The demo route `/r/demo-creator` detects likely platform and routes to iOS, Android, or fallback URL.

## Technical Requirements

- Next.js App Router with TypeScript.
- Tailwind CSS design system using TrailKit variables.
- Prisma ORM with SQLite local fallback and PostgreSQL-ready model shapes.
- API route handlers for MVP endpoints.
- Seed script with realistic sample data.
- Vercel-ready build and environment variable template.
- Basic lint, typecheck, build, and smoke tests.

## Data Model

- Workspace: account boundary for one or more app teams.
- App: mobile app with store URLs and attribution settings.
- Partner: creator, affiliate, agency, referral partner, or campaign owner.
- Campaign: named acquisition initiative.
- SmartLink: source-aware link with slug, destination URLs, campaign, partner, and UTM metadata.
- Click: privacy-conscious click record with user agent, referrer, country placeholder, destination, and hashed IP placeholder.
- AttributionEvent: first-open, trial, subscription, renewal, purchase, and payout events tied to smart links.
- RevenueEvent: amount, currency, product, customer, source, and timestamp.
- PayoutRule: partner commission or fixed payout logic.
- PayoutEstimate: computed partner payout from attributed revenue.
- ApiKey: placeholder for future authenticated ingestion.

## User Stories

- As a founder, I can create a smart link for a creator so I can see clicks and estimated downstream revenue.
- As a growth lead, I can compare email, QR, affiliate, and website-button links in one dashboard.
- As an operator, I can import revenue events and estimate payouts by partner.
- As a developer, I can see the API shape needed for first-open and revenue event integrations.
- As a beta customer, I can understand MVP attribution limitations before relying on payout reports.

## Success Metrics

- Activation: 80% of beta teams create at least three smart links in week one.
- Attribution coverage: 60% of clicked links receive at least one downstream event during beta testing.
- Payout usefulness: 70% of beta teams export or review payout estimates monthly.
- Time saved: operators report replacing at least one manual spreadsheet workflow.
- Conversion: five paying design partners from the private beta.

## Risks

- Mobile attribution expectations may exceed what can be proven without SDKs or platform integrations.
- Store redirects and first-open matching can be lossy under ATT and privacy constraints.
- Payout estimates need clear auditability before customers trust them.
- Postgres production setup and auth are required before real customer data.
- The product can drift into creator CRM or generic affiliate software if scope is not enforced.

## Open Questions

- Which integration should ship first: RevenueCat, Adapty, Apphud, Superwall, Stripe, or manual CSV import?
- What is the minimum mobile SDK needed for first-open matching without overbuilding?
- Should beta pricing be based on apps, tracked links, events, or attributed revenue?
- Which payout rules are most common among app teams: percent of revenue, fixed install bounty, trial bounty, or hybrid?
- How much reporting do partners need directly versus founder-exported reports?
