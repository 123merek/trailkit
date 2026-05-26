import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  Link2,
  MousePointerClick,
  Send,
  ShieldCheck,
  Smartphone,
  Store,
} from "lucide-react";
import { AttributionFlowVisual } from "@/components/landing/AttributionFlowVisual";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { DashboardMockup } from "@/components/landing/DashboardMockup";
import { RevenuePathVisual } from "@/components/landing/RevenuePathVisual";
import { Logo } from "@/components/shared/Logo";

const proof = ["Subscription apps", "Indie app teams", "Creator launches", "Affiliate programs", "QR campaigns"];

const stats = [
  { value: "6.6K", label: "demo clicks tracked" },
  { value: "1.4K", label: "matched installs" },
  { value: "$22K", label: "attributed revenue" },
  { value: "$2.2K", label: "estimated payouts" },
];

const problems = [
  {
    title: "App affiliate tracking breaks too easily",
    copy: "Clicks, app-store opens, installs, subscriptions, renewals, and partner payouts usually live in different systems.",
  },
  {
    title: "Partners need proof, not screenshots",
    copy: "Creators and affiliates promote harder when they can trust the trail from link activity to earned commission.",
  },
  {
    title: "Most attribution stacks are too heavy",
    copy: "Founder-led app teams need useful growth infrastructure before they need a full enterprise MMP rollout.",
  },
];

const workflow = [
  {
    title: "Create links",
    copy: "Give every creator, affiliate, email, QR code, app-store button, and paid campaign a dedicated smart link.",
    icon: Link2,
  },
  {
    title: "Track performance",
    copy: "Record clicks, route by platform, and connect install or first-open events through SDK or server integrations.",
    icon: BarChart3,
  },
  {
    title: "Match revenue",
    copy: "Import RevenueCat-ready events, CSV rows, or API events to attribute trials, purchases, subscriptions, and renewals.",
    icon: CircleDollarSign,
  },
  {
    title: "Estimate payouts",
    copy: "Calculate partner commissions and export reports without rebuilding payout spreadsheets every week.",
    icon: BadgeDollarSign,
  },
];

const platform = [
  {
    title: "Mobile smart links",
    detail: "App Store routing, Google Play routing, fallback URLs, UTM fields, QR codes, branded slugs, and source types.",
    icon: Smartphone,
  },
  {
    title: "In-app purchase attribution",
    detail: "A practical path to match affiliate-driven app revenue across subscriptions, renewals, purchases, and trials.",
    icon: Store,
  },
  {
    title: "Transparent partner reporting",
    detail: "A clear source-level view of clicks, installs, revenue, payout rate, payout status, and campaign history.",
    icon: ShieldCheck,
  },
  {
    title: "Developer-friendly event flow",
    detail: "API routes, webhooks, CSV import, and SDK handshake planning that app teams can harden over time.",
    icon: Code2,
  },
];

const integrations = ["RevenueCat-ready", "Adapty plan", "Apphud plan", "Superwall plan", "CSV import", "Direct API", "Webhook events", "Stripe payout exports"];

const pricing = [
  { name: "Free", price: "$0", detail: "Validate links, clicks, and demo attribution paths." },
  { name: "Starter", price: "$29/mo", detail: "For indie apps testing creators, affiliates, QR, and owned links." },
  { name: "Growth", price: "$99/mo", detail: "For subscription apps that need revenue imports and payout reports." },
];

const faqs = [
  {
    q: "Is TrailKit an affiliate marketplace?",
    a: "No. TrailKit is attribution and payout infrastructure. Recruiting partners is intentionally outside the MVP.",
  },
  {
    q: "Is this a full MMP replacement?",
    a: "Not yet. TrailKit starts with smart links, click tracking, event matching, revenue attribution, and payout estimates.",
  },
  {
    q: "Can it track in-app purchases?",
    a: "Yes through SDK or event integrations. The MVP includes RevenueCat-ready ingestion, direct revenue APIs, and CSV import.",
  },
  {
    q: "Does it use fingerprinting?",
    a: "No. TrailKit is privacy-conscious and avoids invasive fingerprinting or ATT bypass claims.",
  },
];

export default function Home() {
  return (
    <main className="trailkit-lp min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Logo variant="dark" />
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#4a4a4a] md:flex">
          <a href="#platform" className="transition hover:text-black">Platform</a>
          <a href="#workflow" className="transition hover:text-black">How it works</a>
          <a href="#compare" className="transition hover:text-black">Compare</a>
          <Link href="/dashboard" className="transition hover:text-black">Demo</Link>
        </nav>
        <a
          href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#765dff]"
        >
          Join beta
        </a>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 text-center md:pt-16">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-semibold text-white">
          <MousePointerClick className="h-4 w-4 text-[#9cf5c7]" />
          Developer-first attribution for mobile app growth
        </div>
        <h1 className="mx-auto mt-7 max-w-6xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-black md:text-7xl lg:text-8xl">
          The attribution operating system for app growth links.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-[#4a4a4a] md:text-xl">
          TrailKit helps app teams create smart links, track installs and in-app revenue, and estimate partner payouts from one clean workspace.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#765dff]"
          >
            Join the private beta
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-black transition hover:border-black/25 hover:bg-[#f6f6f6]"
          >
            View the demo
          </Link>
        </div>
        <div className="mt-12">
          <DashboardMockup />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 text-center">
        <p className="text-sm font-medium text-[#666]">
          Built for app teams that need measurable growth links, not another creator CRM.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {proof.map((item) => (
            <span key={item} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[8px] border border-black/10 bg-white p-6 text-center shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              <p className="metric-tabular text-4xl font-semibold tracking-[-0.04em] text-black">{stat.value}</p>
              <p className="mt-2 text-sm text-[#666]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="lp-panel p-6 md:p-8">
              <CheckCircle2 className="h-5 w-5 text-[#765dff]" />
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-black">{problem.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">{problem.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-[32px] bg-black p-6 text-white md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#9cf5c7]">How TrailKit works</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                One platform for every app growth campaign.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
                Launch links, watch performance, connect revenue events, and calculate payouts without stitching together MMP exports and affiliate spreadsheets.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {workflow.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-[8px] border border-white/10 bg-white/[0.08] p-5">
                    <Icon className="h-5 w-5 text-[#9cf5c7]" />
                    <h3 className="mt-5 font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/68">{step.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#765dff]">Platform</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
              Mobile attribution that starts where growth actually happens.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#555]">
              TrailKit is for app founders and growth teams who need to know which links, creators, affiliates, emails, QR codes, and buttons lead to real app revenue.
            </p>
          </div>
          <AttributionFlowVisual />
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {platform.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="lp-panel p-5">
                <Icon className="h-5 w-5 text-[#765dff]" />
                <h3 className="mt-5 font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555]">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <RevenuePathVisual />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#765dff]">Revenue stack</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
              Built for subscriptions, IAP, and partner payouts.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#555]">
              Start with smart links and CSV imports. Add SDK events, webhooks, and subscription integrations as the attribution model gets stronger.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {integrations.map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#765dff]">Where TrailKit fits</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
            App growth infrastructure, not generic affiliate software.
          </h2>
        </div>
        <div className="mt-10 overflow-x-auto">
          <ComparisonTable />
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#765dff]">Private beta</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
                Get set up before the full SDK is finished.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#555]">
                Beta users get smart links, click tracking, the dashboard, revenue import, payout reports, and early influence over SDK and integration priorities.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {pricing.map((tier) => (
                <div key={tier.name} className="rounded-[8px] border border-black/10 bg-[#f7f7f7] p-5">
                  <p className="text-sm font-semibold text-[#765dff]">{tier.name}</p>
                  <p className="metric-tabular mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">{tier.price}</p>
                  <p className="mt-3 text-sm leading-6 text-[#555]">{tier.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs text-[#666]">Pricing is beta and may change.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="lp-panel p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#35d894]" />
                <div>
                  <h3 className="font-semibold text-black">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#555]">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="rounded-[32px] bg-black p-8 text-white shadow-2xl md:p-12">
          <Send className="mx-auto h-8 w-8 text-[#9cf5c7]" />
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Know which app growth links deserve more budget.
          </h2>
          <a
            href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#9cf5c7]"
          >
            Join the private beta
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
