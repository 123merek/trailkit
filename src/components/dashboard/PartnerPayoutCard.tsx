import { BadgeDollarSign, Link2 } from "lucide-react";
import type { Partner } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export function PartnerPayoutCard({ partner }: { partner: Partner }) {
  const statusClass =
    partner.status === "active"
      ? "border-[#35d894]/25 bg-[#9cf5c7]/34 text-[#287a55]"
      : partner.status === "review"
        ? "border-[#ffc766]/30 bg-[#ffd979]/28 text-[#8a6114]"
        : "border-[#dfd4f4] bg-[#eee6ff] text-[#72668a]";

  return (
    <div className="rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-5 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#372a54]">{partner.name}</p>
          <p className="mt-1 text-sm text-[#72668a]">{partner.type}</p>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}>
          {partner.status}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[8px] border border-[#dfd4f4] bg-[#f8f4ff] p-3">
          <div className="flex items-center gap-2 text-xs text-[#72668a]">
            <Link2 className="h-3.5 w-3.5" />
            Links
          </div>
          <p className="metric-tabular mt-2 text-xl font-semibold text-[#372a54]">{partner.links}</p>
        </div>
        <div className="rounded-[8px] border border-[#dfd4f4] bg-[#f8f4ff] p-3">
          <div className="flex items-center gap-2 text-xs text-[#72668a]">
            <BadgeDollarSign className="h-3.5 w-3.5" />
            Payout
          </div>
          <p className="metric-tabular mt-2 text-xl font-semibold text-[#372a54]">
            {formatCurrency(partner.estimatedPayout)}
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-[#dfd4f4] pt-4">
        <p className="text-xs text-[#72668a]">Rule</p>
        <p className="mt-1 text-sm text-[#372a54]">{partner.payoutRate}</p>
        <p className="metric-tabular mt-3 text-sm text-[#72668a]">
          {formatCurrency(partner.revenueAttributed)} attributed revenue
        </p>
      </div>
    </div>
  );
}
