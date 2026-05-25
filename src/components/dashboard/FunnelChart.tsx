import { formatNumber } from "@/lib/utils";

const colors = ["#2FD4FF", "#24CDE3", "#55F0B0", "#9BEF96", "#FFC766"];

export function FunnelChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-72 flex-col justify-center gap-4">
      {data.map((item, index) => {
        const width = Math.max(6, (item.value / max) * 100);

        return (
          <div key={item.name}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
              <span className="text-muted">{item.name}</span>
              <span className="metric-tabular font-medium text-white">{formatNumber(item.value)}</span>
            </div>
            <div className="h-5 overflow-hidden rounded-[8px] bg-white/[0.06]">
              <div
                className="h-full rounded-[8px]"
                style={{
                  width: `${width}%`,
                  background: colors[index % colors.length],
                  opacity: 1 - index * 0.06,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
