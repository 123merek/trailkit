import {
  BadgeDollarSign,
  CreditCard,
  MousePointerClick,
  PlayCircle,
  Repeat2,
  Smartphone,
  Store,
  Users,
} from "lucide-react";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { LinkPerformanceTable } from "@/components/dashboard/LinkPerformanceTable";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PartnerPayoutCard } from "@/components/dashboard/PartnerPayoutCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { getDashboardMetrics, listPartners, listSmartLinks } from "@/lib/data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export default async function DashboardPage() {
  const dashboard = await getDashboardMetrics();
  const links = await listSmartLinks();
  const partners = await listPartners();

  return (
    <main className="px-4 py-6 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">MVP dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Click-to-revenue overview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Mocked workspace for FocusForge showing how smart links can connect source activity to installs, revenue, and payout estimates.
          </p>
        </div>
        <div className="rounded-full border border-[#dfd4f4] bg-[#fffdf8]/76 px-4 py-3 text-sm text-[#72668a]">
          Workspace: <span className="font-medium text-white">FocusForge Growth</span>
        </div>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={MousePointerClick} label="Total clicks" value={formatNumber(dashboard.totals.clicks)} detail="All tracked smart links" />
        <MetricCard icon={Store} label="Store opens" value={formatNumber(dashboard.totals.storeOpens)} detail="iOS, Android, fallback routed" />
        <MetricCard icon={Smartphone} label="Installs" value={formatNumber(dashboard.totals.installs)} detail={`${formatPercent(dashboard.conversion.clickToInstall)} click to install`} tone="success" />
        <MetricCard icon={PlayCircle} label="Trials" value={formatNumber(dashboard.totals.trials)} detail={`${formatPercent(dashboard.conversion.installToTrial)} install to trial`} tone="success" />
        <MetricCard icon={CreditCard} label="Subscriptions" value={formatNumber(dashboard.totals.subscriptions)} detail={`${formatPercent(dashboard.conversion.trialToPaid)} trial to paid`} tone="warning" />
        <MetricCard icon={BadgeDollarSign} label="Revenue" value={formatCurrency(dashboard.totals.revenue)} detail="Matched and imported events" tone="warning" />
        <MetricCard icon={Users} label="Estimated payouts" value={formatCurrency(dashboard.totals.payout)} detail="Pending partner review" tone="warning" />
        <MetricCard icon={Repeat2} label="Renewal events" value="38" detail="Included in revenue attribution" />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-5 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue and installs</h2>
              <p className="mt-1 text-sm text-muted">Demo trend by smart-link source.</p>
            </div>
          </div>
          <RevenueChart data={dashboard.revenueSeries} />
        </div>
        <div className="rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-5 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
          <h2 className="text-lg font-semibold text-white">Conversion funnel</h2>
          <p className="mt-1 text-sm text-muted">Click to subscription path.</p>
          <FunnelChart data={dashboard.funnel} />
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Top smart links</h2>
            <p className="mt-1 text-sm text-muted">Source-level attribution from click to paid conversion.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <LinkPerformanceTable links={links} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {partners.slice(0, 3).map((partner) => (
          <PartnerPayoutCard key={partner.id} partner={partner} />
        ))}
      </section>
    </main>
  );
}
