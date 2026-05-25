# TrailKit Agent Instructions

TrailKit is lightweight mobile attribution and payout infrastructure for app teams. Position it as founder-friendly smart links, attribution, revenue tracking, and payout calculation. Do not turn it into a creator CRM, UGC workflow tool, generic web affiliate product, RevenueCat-only integration, or enterprise MMP clone.

## Product Rules

- Core promise: track every app growth link from click to install to revenue.
- Use honest language: attribute, estimate, match, connect, track with SDK or event integrations.
- Avoid claims of perfect tracking, fingerprinting, bypassing ATT, or guaranteed install attribution.
- Keep the dashboard focused on links, events, revenue, partners, and payout estimates.

## Design Rules

- Use the TrailKit brand variables from `src/app/globals.css`.
- Default to deep ink backgrounds, cyan primary, mint success, amber revenue, thin grid lines, and 8px cards.
- Build dense, useful product surfaces. Avoid marketing-only screens inside the app.
- Use Lucide icons for interface controls where possible.

## Engineering Rules

- Stack: Next.js App Router, TypeScript, Tailwind CSS, Prisma, Recharts, Framer Motion, Lucide.
- Keep Server Components as the default. Push client components down to charts, copy buttons, forms, and animation.
- Use privacy-conscious attribution examples. Do not implement invasive fingerprinting.
- Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.

## Docs

Update `/docs/PRD.md`, `/docs/ROADMAP.md`, and `/docs/ARCHITECTURE.md` when product scope, data model, or API behavior changes.
