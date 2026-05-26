import { ArrowUpRight, BadgeDollarSign, Link2, MousePointerClick, Smartphone } from "lucide-react";
import { getDashboardMetrics, getSmartLinks } from "@/lib/sample-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function DashboardMockup() {
  const metrics = getDashboardMetrics();
  const topLinks = getSmartLinks().slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-6xl rounded-[32px] border border-[#fffdf8]/34 bg-[#fffdf8]/74 p-3 shadow-2xl backdrop-blur">
      <div className="rounded-[26px] border border-[#d8cdf7]/70 bg-[#f5efff] p-4">
        <div className="flex flex-col gap-4 border-b border-[#d8cdf7] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase text-[#72668a]">FocusForge growth trails</p>
            <h3 className="mt-1 text-xl font-semibold text-[#372a54]">Attribution overview</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#35d894]/25 bg-[#9cf5c7]/34 px-3 py-2 text-sm font-semibold text-[#287a55]">
            <ArrowUpRight className="h-4 w-4" />
            18.4% trial lift
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <MockMetric icon={MousePointerClick} label="Clicks" value={formatNumber(metrics.totals.clicks)} />
          <MockMetric icon={Smartphone} label="Installs" value={formatNumber(metrics.totals.installs)} tone="success" />
          <MockMetric icon={BadgeDollarSign} label="Revenue" value={formatCurrency(metrics.totals.revenue)} tone="warning" />
          <MockMetric icon={Link2} label="Payouts" value={formatCurrency(metrics.totals.payout)} tone="warning" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[8px] border border-[#d8cdf7] bg-[#fffdf8]/78 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-[#372a54]">Top smart links</p>
              <p className="text-xs text-[#72668a]">click to revenue</p>
            </div>
            <div className="space-y-3">
              {topLinks.map((link) => (
                <div key={link.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-[8px] border border-[#e0d7f7] bg-[#f8f4ff] p-3">
                  <div>
                    <p className="text-sm font-medium text-[#372a54]">{link.name}</p>
                    <p className="text-xs text-[#72668a]">{link.sourceType} / {link.campaign}</p>
                  </div>
                  <div className="text-right">
                    <p className="metric-tabular text-sm font-semibold text-[#372a54]">{formatCurrency(link.metrics.revenue)}</p>
                    <p className="metric-tabular text-xs text-[#72668a]">{formatNumber(link.metrics.installs)} installs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#d8cdf7] bg-[#fffdf8]/78 p-4">
            <p className="text-sm font-medium text-[#372a54]">Funnel</p>
            <div className="mt-4 space-y-3">
              {metrics.funnel.map((step, index) => {
                const width = Math.max(10, (step.value / metrics.funnel[0].value) * 100);

                return (
                  <div key={step.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-[#72668a]">{step.name}</span>
                      <span className="metric-tabular text-[#372a54]">{formatNumber(step.value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e4daf9]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#765dff] via-[#35d894] to-[#ffc766]"
                        style={{ width: `${width}%`, opacity: 1 - index * 0.08 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockMetric({
  icon: Icon,
  label,
  value,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "primary" | "success" | "warning";
}) {
  const toneClass = {
    primary: "text-[#765dff] border-[#765dff]/25 bg-[#765dff]/10",
    success: "text-[#287a55] border-[#35d894]/25 bg-[#9cf5c7]/34",
    warning: "text-[#8a6114] border-[#ffc766]/30 bg-[#ffd979]/28",
  }[tone];

  return (
    <div className="rounded-[8px] border border-[#d8cdf7] bg-[#fffdf8]/78 p-4">
      <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${toneClass}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-4 text-xs text-[#72668a]">{label}</p>
      <p className="metric-tabular mt-1 text-2xl font-semibold text-[#372a54]">{value}</p>
    </div>
  );
}
