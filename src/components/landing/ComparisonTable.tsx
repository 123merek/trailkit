const rows = [
  {
    category: "Best fit",
    trailkit: "Founder-friendly app growth links",
    mmp: "Large app portfolios",
    affiliate: "Web affiliate programs",
    crm: "Creator relationship workflow",
  },
  {
    category: "Primary object",
    trailkit: "Smart link -> install -> revenue trail",
    mmp: "Full attribution stack",
    affiliate: "Referral and commission record",
    crm: "Creator contact and content status",
  },
  {
    category: "Mobile-first",
    trailkit: "Yes",
    mmp: "Yes, but heavy",
    affiliate: "Usually no",
    crm: "Usually no",
  },
  {
    category: "Payout estimates",
    trailkit: "Built into source reporting",
    mmp: "Usually external",
    affiliate: "Strong but web-first",
    crm: "Manual or external",
  },
  {
    category: "MVP complexity",
    trailkit: "Lightweight",
    mmp: "Complex",
    affiliate: "Medium",
    crm: "Medium",
  },
];

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-2xl">
      <div className="grid min-w-[820px] grid-cols-5 bg-black text-sm font-semibold text-white">
        <div className="p-4">Category</div>
        <div className="border-l border-white/15 p-4 text-[#9cf5c7]">TrailKit</div>
        <div className="border-l border-white/15 p-4">Enterprise MMPs</div>
        <div className="border-l border-white/15 p-4">Generic Affiliate Tools</div>
        <div className="border-l border-white/15 p-4">Creator CRMs</div>
      </div>
      {rows.map((row) => (
        <div key={row.category} className="grid min-w-[820px] grid-cols-5 border-t border-black/10 text-sm">
          <div className="p-4 font-medium text-black">{row.category}</div>
          <div className="border-l border-black/10 bg-[#f0fff7] p-4 font-medium text-black">{row.trailkit}</div>
          <div className="border-l border-black/10 p-4 text-[#555]">{row.mmp}</div>
          <div className="border-l border-black/10 p-4 text-[#555]">{row.affiliate}</div>
          <div className="border-l border-black/10 p-4 text-[#555]">{row.crm}</div>
        </div>
      ))}
    </div>
  );
}
