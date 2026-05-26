import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  detail?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    primary: "border-[#765dff]/25 bg-[#765dff]/10 text-[#765dff]",
    success: "border-[#35d894]/25 bg-[#9cf5c7]/34 text-[#287a55]",
    warning: "border-[#ffc766]/30 bg-[#ffd979]/28 text-[#8a6114]",
    danger: "border-danger/30 bg-danger/10 text-danger",
  }[tone];

  return (
    <div className="rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-4 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#72668a]">{label}</p>
          <p className="metric-tabular mt-2 text-2xl font-semibold text-[#372a54]">{value}</p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail ? <p className="mt-3 text-xs text-[#72668a]">{detail}</p> : null}
    </div>
  );
}
