import { BadgeDollarSign, Link2 } from "lucide-react";
import type { Partner } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export function PartnerPayoutCard({ partner }: { partner: Partner }) {
  const statusClass =
    partner.status === "active"
      ? "border-success/25 bg-success/10 text-success"
      : partner.status === "review"
        ? "border-warning/25 bg-warning/10 text-warning"
        : "border-white/10 bg-white/[0.04] text-muted";

  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{partner.name}</p>
          <p className="mt-1 text-sm text-muted">{partner.type}</p>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}>
          {partner.status}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[8px] border border-white/10 bg-black/10 p-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link2 className="h-3.5 w-3.5" />
            Links
          </div>
          <p className="metric-tabular mt-2 text-xl font-semibold text-white">{partner.links}</p>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-black/10 p-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <BadgeDollarSign className="h-3.5 w-3.5" />
            Payout
          </div>
          <p className="metric-tabular mt-2 text-xl font-semibold text-white">
            {formatCurrency(partner.estimatedPayout)}
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-xs text-muted">Rule</p>
        <p className="mt-1 text-sm text-white">{partner.payoutRate}</p>
        <p className="metric-tabular mt-3 text-sm text-muted">
          {formatCurrency(partner.revenueAttributed)} attributed revenue
        </p>
      </div>
    </div>
  );
}
