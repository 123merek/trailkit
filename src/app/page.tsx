import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Blocks,
  CheckCircle2,
  Code2,
  Link2,
  MousePointerClick,
  QrCode,
  Route,
  Send,
  Smartphone,
  TableProperties,
  Webhook,
} from "lucide-react";
import { AttributionFlowVisual } from "@/components/landing/AttributionFlowVisual";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { DashboardMockup } from "@/components/landing/DashboardMockup";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { RevenuePathVisual } from "@/components/landing/RevenuePathVisual";
import { Logo } from "@/components/shared/Logo";

const features = [
  {
    title: "Smart links for every channel",
    copy: "Give creators, affiliates, campaigns, emails, QR codes, and buttons their own trackable app link.",
    icon: Link2,
  },
  {
    title: "App store routing",
    copy: "Route likely iOS users to the App Store, Android users to Google Play, and everyone else to a fallback.",
    icon: Smartphone,
  },
  {
    title: "Install and first-open attribution",
    copy: "Connect clicks to app events with SDK or event integrations as the product matures.",
    icon: Route,
  },
  {
    title: "Revenue attribution",
    copy: "Match trials, subscriptions, renewals, purchases, and revenue events back to the source link.",
    icon: BadgeDollarSign,
  },
  {
    title: "Partner payout calculations",
    copy: "Estimate creator, affiliate, and referral payouts without spreadsheet chaos.",
    icon: TableProperties,
  },
  {
    title: "QR codes and branded links",
    copy: "Prepare offline campaigns, custom domains, and channel-specific slugs for launch.",
    icon: QrCode,
  },
  {
    title: "Webhooks and APIs",
    copy: "Use event endpoints for first opens, revenue events, and future app integrations.",
    icon: Webhook,
  },
  {
    title: "RevenueCat-ready event flow",
    copy: "Designed for RevenueCat, Adapty, Apphud, Superwall, manual import, and direct APIs.",
    icon: Code2,
  },
];

const useCases = [
  "Creator campaigns",
  "Affiliate partners",
  "Email campaigns",
  "Website app buttons",
  "QR campaigns",
  "Paid UGC",
  "Referral partners",
  "Custom landing pages",
];

const betaItems = [
  "Smart links",
  "Click tracking",
  "Campaign dashboard",
  "Revenue event import",
  "Manual payout reports",
  "Early SDK access",
];

const pricing = [
  { name: "Free", price: "$0", detail: "Validate links and clicks", cta: "Start testing" },
  { name: "Starter", price: "$29/mo", detail: "For indie apps proving channels", cta: "Join beta" },
  { name: "Growth", price: "$99/mo", detail: "For subscription apps with partners", cta: "Join beta" },
  { name: "Scale", price: "Custom", detail: "For multi-app teams and agencies", cta: "Talk to us" },
];

const faqs = [
  {
    q: "Is this a Branch alternative?",
    a: "TrailKit can overlap with smart links and attribution, but the MVP is intentionally lighter. It focuses on source links, revenue matching, and payout estimates for smaller app teams.",
  },
  {
    q: "Do I need an SDK?",
    a: "Clicks and routing work without an SDK. Stronger first-open and deferred deep-link attribution require a mobile SDK or event integration.",
  },
  {
    q: "Can this work with RevenueCat?",
    a: "Yes. The data model and API shape are RevenueCat-ready, but TrailKit is not RevenueCat-only.",
  },
  {
    q: "Can I track creator links?",
    a: "Yes. Creator links are one source type, alongside affiliates, email, QR, website buttons, referral partners, and custom campaigns.",
  },
  {
    q: "Does it automate payouts?",
    a: "The MVP estimates payouts for review. Automated payout movement is a later phase.",
  },
  {
    q: "What can be tracked without fingerprinting?",
    a: "TrailKit can track clicks, routing, tagged events, imported revenue, and SDK or integration-based matches. It does not use invasive fingerprinting.",
  },
  {
    q: "Is this for web affiliate programs?",
    a: "No. TrailKit is mobile-first link attribution and payout infrastructure for app teams.",
  },
  {
    q: "Is this only for creators?",
    a: "No. Creators are one use case. The core product is link-to-install-to-revenue attribution across growth channels.",
  },
];

export default function Home() {
  return (
    <main className="gradient-grid min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#product" className="transition hover:text-white">Product</a>
          <a href="#compare" className="transition hover:text-white">Compare</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <Link href="/dashboard" className="transition hover:text-white">Demo</Link>
        </nav>
        <a
          href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
          className="inline-flex h-10 items-center justify-center rounded-[8px] bg-primary px-4 text-sm font-semibold text-ink transition hover:bg-white"
        >
          Join beta
        </a>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-10 text-center md:pt-16">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm text-primary">
          <MousePointerClick className="h-4 w-4" />
          Mobile attribution without the MMP bloat
        </div>
        <h1 className="mx-auto mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
          Track every app growth link from click to revenue.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted md:text-xl">
          TrailKit gives every creator, campaign, email, QR code, and website button its own smart link - then shows which ones drive installs, subscriptions, revenue, and payouts.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-primary px-5 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Join the private beta
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-primary/10"
          >
            View the demo
          </Link>
        </div>
        <div className="mt-10">
          <DashboardMockup />
        </div>
      </section>

      <LogoCloud />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">The gap</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              App teams need attribution that starts with links and ends with revenue.
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              "MMPs are too bloated for small teams.",
              "Affiliate tools are too web-first.",
              "Creator tools do not connect installs to revenue.",
              "Payout spreadsheets make partner reporting slow and fragile.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary">Product</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            One lightweight system for app growth attribution.
          </h2>
          <p className="mt-4 text-muted">
            Replace scattered links, messy spreadsheets, and bloated MMP workflows with a link-first attribution layer for mobile app teams.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Create, share, attribute, reward.
            </h2>
            <div className="mt-6 space-y-4">
              {["Create a smart link.", "Share it anywhere.", "Attribute installs and revenue.", "Reward the right partners."].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <AttributionFlowVisual />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Use cases</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Every growth link gets its own trail.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            TrailKit is source-aware without becoming a CRM. Use it for creator links, partner links, owned channels, and campaign-specific app buttons.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <div key={useCase} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
              <Blocks className="h-5 w-5 text-primary" />
              <p className="mt-4 font-medium text-white">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary">Dashboard preview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            See the links, revenue, and payout estimates in one place.
          </h2>
        </div>
        <div className="mt-10">
          <RevenuePathVisual />
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary">Positioning</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Mobile-first link attribution from click to revenue.
          </h2>
        </div>
        <div className="mt-10 overflow-x-auto">
          <ComparisonTable />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-[8px] border border-primary/20 bg-primary/[0.05] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold text-primary">Private beta</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Start with the useful version, then harden the attribution layer.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Beta teams get the link, dashboard, revenue import, and payout-report workflows first, with SDK and integrations shaped by real customer usage.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {betaItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-black/15 p-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary">Pricing preview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Simple beta pricing.</h2>
          <p className="mt-4 text-muted">Pricing is beta and may change.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {pricing.map((tier) => (
            <div key={tier.name} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-primary">{tier.name}</p>
              <p className="metric-tabular mt-3 text-3xl font-semibold text-white">{tier.price}</p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{tier.detail}</p>
              <a
                href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-[8px] border border-white/10 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-primary/10"
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Straight answers for app teams.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-semibold text-white">{faq.q}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <Send className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">
            Know which links actually grow your app.
          </h2>
          <a
            href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-primary px-5 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Join the private beta
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
