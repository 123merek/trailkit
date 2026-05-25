import Link from "next/link";
import { ArrowRight, BadgeDollarSign, MousePointerClick, Smartphone } from "lucide-react";
import type { SmartLink } from "@/lib/sample-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function SmartLinkCard({ link }: { link: SmartLink }) {
  return (
    <Link
      href={`/dashboard/links/${link.id}`}
      className="block rounded-[8px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-primary/40 hover:bg-primary/[0.04]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{link.name}</p>
          <p className="mt-1 text-sm text-muted">{link.sourceType} / {link.campaign}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted" />
      </div>
      <p className="mt-4 rounded-[8px] border border-white/10 bg-black/10 px-3 py-2 font-mono text-xs text-primary">
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
    <div className="rounded-[8px] border border-white/10 bg-black/10 p-3">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-2 text-xs text-muted">{label}</p>
      <p className="metric-tabular mt-1 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
