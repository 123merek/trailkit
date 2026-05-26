import { formatNumber } from "@/lib/utils";

const colors = ["#765DFF", "#8F7BFF", "#35D894", "#9CF5C7", "#FFC766"];

export function FunnelChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-72 flex-col justify-center gap-4">
      {data.map((item, index) => {
        const width = Math.max(6, (item.value / max) * 100);

        return (
          <div key={item.name}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
              <span className="text-[#72668a]">{item.name}</span>
              <span className="metric-tabular font-medium text-[#372a54]">{formatNumber(item.value)}</span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-[#e6ddfa]">
              <div
                className="h-full rounded-full"
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
