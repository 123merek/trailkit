import Link from "next/link";
import { ArrowRight, BadgeDollarSign, MousePointerClick, Smartphone } from "lucide-react";
import type { SmartLink } from "@/lib/sample-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function SmartLinkCard({ link }: { link: SmartLink }) {
  return (
    <Link
      href={`/dashboard/links/${link.id}`}
      className="block rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-5 shadow-[0_14px_35px_rgba(55,42,84,0.08)] transition hover:border-[#765dff]/40 hover:bg-[#f8f4ff]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-[#372a54]">{link.name}</p>
          <p className="mt-1 text-sm text-[#72668a]">{link.sourceType} / {link.campaign}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-[#72668a]" />
      </div>
      <p className="mt-4 rounded-full border border-[#dfd4f4] bg-[#eee6ff] px-3 py-2 font-mono text-xs text-[#765dff]">
        /r/{link.slug}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <SmallStat icon={MousePointerClick} label="Clicks" value={formatNumber(link.metrics.clicks)} />
        <SmallStat icon={Smartphone} label="Installs" value={formatNumber(link.metrics.installs)} />
        <SmallStat icon={BadgeDollarSign} label="Revenue" value={formatCurrency(link.metrics.revenue)} />
      </div>
    </Link>
  );
}

function SmallStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[8px] border border-[#dfd4f4] bg-[#f8f4ff] p-3">
      <Icon className="h-4 w-4 text-[#765dff]" />
      <p className="mt-2 text-xs text-[#72668a]">{label}</p>
      <p className="metric-tabular mt-1 truncate text-sm font-semibold text-[#372a54]">{value}</p>
    </div>
  );
}
