import { notFound } from "next/navigation";
import { BadgeDollarSign, CalendarDays, MousePointerClick, QrCode, Smartphone, Store } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { getEvents, getSmartLink } from "@/lib/sample-data";
import { conversionRate, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export default async function LinkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = getSmartLink(id);

  if (!link) {
    notFound();
  }

  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/r/${link.slug}`;
  const linkEvents = getEvents().filter((event) => event.smartLinkId === link.id);
  const funnel = [
    { name: "Clicks", value: link.metrics.clicks },
    { name: "Store opens", value: link.metrics.storeOpens },
    { name: "Installs", value: link.metrics.installs },
    { name: "Trials", value: link.metrics.trials },
    { name: "Subscriptions", value: link.metrics.subscriptions },
  ];

  return (
    <main className="px-4 py-6 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{link.sourceType} smart link</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{link.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {link.sourceName} / {link.campaign}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-[8px] border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center">
          <code className="break-all font-mono text-xs text-primary">{shortUrl}</code>
          <CopyButton value={shortUrl} label="Copy link" />
        </div>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={MousePointerClick} label="Clicks" value={formatNumber(link.metrics.clicks)} />
        <MetricCard icon={Store} label="Store opens" value={formatNumber(link.metrics.storeOpens)} />
        <MetricCard icon={Smartphone} label="Installs" value={formatNumber(link.metrics.installs)} tone="success" />
        <MetricCard icon={CalendarDays} label="Trials" value={formatNumber(link.metrics.trials)} tone="success" />
        <MetricCard icon={BadgeDollarSign} label="Revenue" value={formatCurrency(link.metrics.revenue)} tone="warning" />
        <MetricCard icon={BadgeDollarSign} label="Payout" value={formatCurrency(link.metrics.payout)} tone="warning" />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold text-white">Conversion path</h2>
          <p className="mt-1 text-sm text-muted">
            {formatPercent(conversionRate(link.metrics.subscriptions, link.metrics.clicks))} click to paid conversion.
          </p>
          <FunnelChart data={funnel} />
        </div>

        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Event timeline</h2>
              <p className="mt-1 text-sm text-muted">Recent matched and simulated events for this link.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {linkEvents.length ? (
              linkEvents.map((event) => (
                <div key={event.id} className="rounded-[8px] border border-white/10 bg-black/10 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-xs text-primary">{event.eventType}</p>
                    <p className="text-xs text-muted">{new Date(event.occurredAt).toLocaleString()}</p>
                  </div>
                  <p className="mt-2 text-sm text-white">{event.metadata}</p>
                  {event.amount ? (
                    <p className="metric-tabular mt-2 text-sm font-semibold text-warning">
                      {formatCurrency(event.amount, event.currency)}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-white/10 bg-black/10 p-4 text-sm text-muted">
                No recent events in the demo stream for this smart link.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Destination and UTM fields</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["iOS App Store URL", link.iosUrl],
              ["Google Play URL", link.androidUrl],
              ["Fallback URL", link.fallbackUrl],
              ["UTM source", link.utmSource],
              ["UTM medium", link.utmMedium],
              ["UTM campaign", link.utmCampaign],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[8px] border border-white/10 bg-black/10 p-3">
                <p className="text-xs text-muted">{label}</p>
                <p className="mt-1 break-all font-mono text-xs text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">QR placeholder</h2>
          </div>
          <div className="mt-5 grid aspect-square place-items-center rounded-[8px] border border-white/10 bg-black/20">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-5 w-5 rounded-[3px] ${index % 2 === 0 || index % 7 === 0 ? "bg-primary" : "bg-white/10"}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">Generate downloadable QR codes in Phase 2.</p>
        </div>
      </section>
    </main>
  );
}
