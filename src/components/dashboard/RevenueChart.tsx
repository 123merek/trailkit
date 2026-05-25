import { formatCurrency, formatNumber } from "@/lib/utils";

export function RevenueChart({
  data,
}: {
  data: { date: string; clicks: number; revenue: number; installs: number }[];
}) {
  const width = 640;
  const height = 260;
  const padding = 28;
  const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);
  const maxInstalls = Math.max(...data.map((item) => item.installs), 1);
  const revenuePoints = toPoints(data.map((item) => item.revenue), maxRevenue, width, height, padding);
  const installPoints = toPoints(data.map((item) => item.installs), maxInstalls, width, height, padding);
  const last = data[data.length - 1];

  return (
    <div className="h-80 w-full">
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[8px] border border-warning/20 bg-warning/10 p-3">
          <p className="text-xs text-muted">Revenue pace</p>
          <p className="metric-tabular mt-1 text-xl font-semibold text-white">{formatCurrency(last.revenue)}</p>
        </div>
        <div className="rounded-[8px] border border-success/20 bg-success/10 p-3">
          <p className="text-xs text-muted">Install pace</p>
          <p className="metric-tabular mt-1 text-xl font-semibold text-white">{formatNumber(last.installs)}</p>
        </div>
      </div>
      <svg className="h-56 w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Revenue and installs trend">
        <defs>
          <linearGradient id="trailkitRevenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC766" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFC766" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trailkitInstallFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#55F0B0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#55F0B0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 5 }).map((_, index) => {
          const y = padding + index * ((height - padding * 2) / 4);

          return <line key={index} x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(154,168,189,0.14)" />;
        })}
        <polygon points={`${padding},${height - padding} ${revenuePoints} ${width - padding},${height - padding}`} fill="url(#trailkitRevenueFill)" />
        <polygon points={`${padding},${height - padding} ${installPoints} ${width - padding},${height - padding}`} fill="url(#trailkitInstallFill)" />
        <polyline points={revenuePoints} fill="none" stroke="#FFC766" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={installPoints} fill="none" stroke="#55F0B0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((item, index) => {
          const x = padding + index * ((width - padding * 2) / Math.max(data.length - 1, 1));

          return (
            <text key={item.date} x={x} y={height - 4} textAnchor="middle" fill="#9AA8BD" fontSize="12">
              {item.date.replace("May ", "")}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function toPoints(values: number[], max: number, width: number, height: number, padding: number) {
  return values
    .map((value, index) => {
      const x = padding + index * ((width - padding * 2) / Math.max(values.length - 1, 1));
      const y = height - padding - (value / max) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");
}
