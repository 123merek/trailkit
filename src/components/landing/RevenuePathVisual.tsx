import { BadgeDollarSign, Link2, MousePointerClick, Smartphone } from "lucide-react";

const path = [
  { label: "Smart link", value: "tk.link/maya", icon: Link2, color: "border-primary/50 text-primary" },
  { label: "Click", value: "1,842", icon: MousePointerClick, color: "border-primary/50 text-primary" },
  { label: "Install", value: "386", icon: Smartphone, color: "border-success/50 text-success" },
  { label: "Revenue", value: "$6.8k", icon: BadgeDollarSign, color: "border-warning/50 text-warning" },
];

export function RevenuePathVisual() {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {path.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-[8px] border ${item.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-5 text-xs uppercase text-muted">{item.label}</p>
            <p className="metric-tabular mt-1 text-xl font-semibold text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
