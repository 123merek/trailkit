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
    primary: "border-primary/30 bg-primary/10 text-primary",
    success: "border-success/30 bg-success/10 text-success",
    warning: "border-warning/30 bg-warning/10 text-warning",
    danger: "border-danger/30 bg-danger/10 text-danger",
  }[tone];

  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="metric-tabular mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-[8px] border", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {detail ? <p className="mt-3 text-xs text-muted">{detail}</p> : null}
    </div>
  );
}
