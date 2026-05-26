import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CircleDollarSign,
  Link2,
  MousePointerClick,
  QrCode,
  Route,
  Send,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { AttributionFlowVisual } from "@/components/landing/AttributionFlowVisual";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { DashboardMockup } from "@/components/landing/DashboardMockup";
import { RevenuePathVisual } from "@/components/landing/RevenuePathVisual";
import { Logo } from "@/components/shared/Logo";

const proof = ["Subscription apps", "Indie founders", "Growth teams", "Creator tests", "Partner programs"];

const problems = [
  {
    title: "MMPs are too much",
    copy: "Powerful, expensive, and built for teams with dedicated analytics and lifecycle ops.",
  },
  {
    title: "Affiliate tools are web-first",
    copy: "They handle payouts, but they do not naturally connect app installs, trials, renewals, and store routing.",
  },
  {
    title: "Creator tools stop too early",
    copy: "They manage people and content, while app teams still need click-to-install-to-revenue infrastructure.",
  },
];

const features = [
  {
    title: "Smart links for every channel",
    copy: "Creators, affiliates, emails, QR codes, paid UGC, referral partners, website buttons, and custom campaigns.",
    icon: Link2,
  },
  {
    title: "Mobile-first attribution path",
    copy: "Route by platform, record clicks, connect first opens, and match revenue events without invasive fingerprinting.",
    icon: Route,
  },
  {
    title: "Revenue and payout clarity",
    copy: "Estimate partner payouts from attributed revenue so founders can replace messy manual spreadsheets.",
    icon: CircleDollarSign,
  },
];

const useCases = [
  { title: "Creator launch", icon: Users, detail: "Track each creator link through installs and subscriptions." },
  { title: "QR campaign", icon: QrCode, detail: "Turn posters, booths, and offline moments into measurable app trails." },
  { title: "Website buttons", icon: Smartphone, detail: "Know which app-store buttons actually drive customers." },
  { title: "Partner payouts", icon: BadgeDollarSign, detail: "Estimate commissions before exporting reports." },
];

const pricing = [
  { name: "Free", price: "$0", detail: "Validate links and clicks" },
  { name: "Starter", price: "$29/mo", detail: "For indie apps proving channels" },
  { name: "Growth", price: "$99/mo", detail: "For subscription apps with partners" },
];

const faqs = [
  {
    q: "Is this a Branch alternative?",
    a: "TrailKit overlaps on smart links and attribution, but the MVP is intentionally lighter and focused on source links, revenue matching, and payout estimates.",
  },
  {
    q: "Do I need an SDK?",
    a: "Clicks and routing work without one. Stronger first-open and deferred attribution require a mobile SDK or event integration.",
  },
  {
    q: "Can this work with RevenueCat?",
    a: "Yes. The event flow is RevenueCat-ready, while staying open to Adapty, Apphud, Superwall, manual imports, and direct APIs.",
  },
  {
    q: "Does it automate payouts?",
    a: "The MVP estimates payouts for review. Automated money movement belongs in a later phase.",
  },
];

export default function Home() {
  return (
    <main className="trailkit-lp min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Logo variant="dark" />
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#5f527a] md:flex">
          <a href="#product" className="transition hover:text-[#372a54]">Product</a>
          <a href="#compare" className="transition hover:text-[#372a54]">Compare</a>
          <a href="#pricing" className="transition hover:text-[#372a54]">Pricing</a>
          <Link href="/dashboard" className="transition hover:text-[#372a54]">Demo</Link>
        </nav>
        <a
          href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#372a54] px-5 text-sm font-semibold text-[#fffdf8] transition hover:bg-[#4e39dd]"
        >
          Join beta
        </a>
      </header>

      <section className="mx-auto max-w-[1380px] px-4 pb-14">
        <div className="lp-hero px-5 py-12 text-center md:px-10 md:py-16">
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#fffdf8]/18 px-4 py-2 text-sm font-semibold text-[#fffdf8] ring-1 ring-[#fffdf8]/24">
              <MousePointerClick className="h-4 w-4" />
              Mobile attribution without the MMP bloat
            </div>
            <h1 className="mx-auto mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] text-[#fffdf8] md:text-7xl">
              Track every app growth link from click to revenue.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-[#fffdf8]/82 md:text-xl">
              TrailKit gives every creator, campaign, email, QR code, and website button its own smart link, then shows which ones drive installs, subscriptions, revenue, and payouts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#fffdf8] px-6 text-sm font-semibold text-[#372a54] transition hover:bg-[#f0e8ff]"
              >
                Join the private beta
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#fffdf8]/22 bg-[#fffdf8]/12 px-6 text-sm font-semibold text-[#fffdf8] transition hover:bg-[#fffdf8]/20"
              >
                View the demo
              </Link>
            </div>
          </div>
          <div className="relative z-10 mt-12">
            <DashboardMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="text-sm font-medium text-[#72668a]">
          Built for subscription apps, indie founders, and modern growth teams.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {proof.map((item) => (
            <span key={item} className="rounded-full border border-[#d8cdf7] bg-[#fffdf8]/72 px-4 py-2 text-sm font-semibold text-[#5b4c7d]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="lp-panel p-6 md:p-8">
              <Sparkles className="h-5 w-5 text-[#765dff]" />
              <h2 className="mt-6 text-2xl font-semibold text-[#372a54]">{problem.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#72668a]">{problem.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-4 py-16">
        <div className="lp-soft-band rounded-[32px] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#765dff]">Product</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight text-[#372a54] md:text-5xl">
                One friendly attribution layer for app growth links.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#72668a]">
                Replace scattered links, messy spreadsheets, and bloated MMP workflows with a lightweight system that starts at the smart link and ends at attributed revenue.
              </p>
              <div className="mt-8 grid gap-3">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="flex gap-4 rounded-[8px] bg-[#fffdf8]/72 p-4 ring-1 ring-[#d8cdf7]/70">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#765dff] text-[#fffdf8]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#372a54]">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#72668a]">{feature.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <AttributionFlowVisual />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#765dff]">Use cases</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold text-[#372a54] md:text-5xl">
              Every channel gets a clear trail.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#72668a]">
              TrailKit stays focused on app attribution infrastructure, not creator CRM, UGC review, or generic web affiliate software.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;

              return (
                <div key={useCase.title} className="lp-panel p-5">
                  <Icon className="h-5 w-5 text-[#765dff]" />
                  <h3 className="mt-5 font-semibold text-[#372a54]">{useCase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#72668a]">{useCase.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#765dff]">Dashboard preview</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-[#372a54] md:text-5xl">
            Clicks, installs, revenue, and payouts in one clean path.
          </h2>
        </div>
        <div className="mt-10">
          <RevenuePathVisual />
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#765dff]">Positioning</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-[#372a54] md:text-5xl">
            Mobile-first link attribution without enterprise weight.
          </h2>
        </div>
        <div className="mt-10 overflow-x-auto">
          <ComparisonTable />
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
        <div className="lp-soft-band rounded-[32px] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#765dff]">Private beta</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold text-[#372a54] md:text-5xl">
                Start simple. Harden the attribution layer with real teams.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#72668a]">
                Beta includes smart links, click tracking, a campaign dashboard, revenue import, manual payout reports, and early SDK access.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {pricing.map((tier) => (
                <div key={tier.name} className="rounded-[8px] bg-[#fffdf8]/76 p-5 ring-1 ring-[#d8cdf7]/70">
                  <p className="text-sm font-semibold text-[#765dff]">{tier.name}</p>
                  <p className="metric-tabular mt-3 text-3xl font-semibold text-[#372a54]">{tier.price}</p>
                  <p className="mt-3 text-sm leading-6 text-[#72668a]">{tier.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs text-[#72668a]">Pricing is beta and may change.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="lp-panel p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#35d894]" />
                <div>
                  <h3 className="font-semibold text-[#372a54]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#72668a]">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="rounded-[32px] bg-[#372a54] p-8 text-[#fffdf8] shadow-2xl md:p-12">
          <Send className="mx-auto h-8 w-8 text-[#ffd979]" />
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold md:text-6xl">
            Know which links actually grow your app.
          </h2>
          <a
            href="mailto:founder@trailkit.dev?subject=TrailKit%20private%20beta"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#fffdf8] px-6 text-sm font-semibold text-[#372a54] transition hover:bg-[#eee6ff]"
          >
            Join the private beta
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
