import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SmartLink } from "@/lib/sample-data";
import { formatCurrency, formatNumber, formatPercent, conversionRate } from "@/lib/utils";

export function LinkPerformanceTable({ links }: { links: SmartLink[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10">
      <div className="grid min-w-[880px] grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto] bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase text-muted">
        <div>Smart link</div>
        <div>Source</div>
        <div>Clicks</div>
        <div>Installs</div>
        <div>Revenue</div>
        <div>Click {"->"} paid</div>
        <div />
      </div>
      {links.map((link) => (
        <div
          key={link.id}
          className="grid min-w-[880px] grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto] items-center border-t border-white/10 px-4 py-3 text-sm"
        >
          <div>
            <p className="font-medium text-white">{link.name}</p>
            <p className="mt-1 font-mono text-xs text-muted">/r/{link.slug}</p>
          </div>
          <div>
            <p className="text-white">{link.sourceType}</p>
            <p className="mt-1 text-xs text-muted">{link.sourceName}</p>
          </div>
          <div className="metric-tabular text-white">{formatNumber(link.metrics.clicks)}</div>
          <div className="metric-tabular text-white">{formatNumber(link.metrics.installs)}</div>
          <div className="metric-tabular text-white">{formatCurrency(link.metrics.revenue)}</div>
          <div className="metric-tabular text-white">
            {formatPercent(conversionRate(link.metrics.subscriptions, link.metrics.clicks))}
          </div>
          <Link
            href={`/dashboard/links/${link.id}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 text-muted transition hover:border-primary/50 hover:text-primary"
            aria-label={`View ${link.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
