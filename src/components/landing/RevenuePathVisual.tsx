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
          <div key={item.label} className="lp-panel p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${item.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-5 text-xs uppercase text-[#666]">{item.label}</p>
            <p className="metric-tabular mt-1 text-2xl font-semibold text-black">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
