import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SmartLink } from "@/lib/sample-data";
import { formatCurrency, formatNumber, formatPercent, conversionRate } from "@/lib/utils";

export function LinkPerformanceTable({ links }: { links: SmartLink[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
      <div className="grid min-w-[880px] grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto] bg-[#eee6ff] px-4 py-3 text-xs font-semibold uppercase text-[#72668a]">
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
          className="grid min-w-[880px] grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto] items-center border-t border-[#dfd4f4] px-4 py-3 text-sm"
        >
          <div>
            <p className="font-medium text-[#372a54]">{link.name}</p>
            <p className="mt-1 font-mono text-xs text-[#72668a]">/r/{link.slug}</p>
          </div>
          <div>
            <p className="text-[#372a54]">{link.sourceType}</p>
            <p className="mt-1 text-xs text-[#72668a]">{link.sourceName}</p>
          </div>
          <div className="metric-tabular text-[#372a54]">{formatNumber(link.metrics.clicks)}</div>
          <div className="metric-tabular text-[#372a54]">{formatNumber(link.metrics.installs)}</div>
          <div className="metric-tabular text-[#372a54]">{formatCurrency(link.metrics.revenue)}</div>
          <div className="metric-tabular text-[#372a54]">
            {formatPercent(conversionRate(link.metrics.subscriptions, link.metrics.clicks))}
          </div>
          <Link
            href={`/dashboard/links/${link.id}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dfd4f4] text-[#72668a] transition hover:border-[#765dff]/50 hover:text-[#765dff]"
            aria-label={`View ${link.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
