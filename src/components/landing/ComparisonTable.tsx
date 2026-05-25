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
    <div className="overflow-hidden rounded-[8px] border border-white/10">
      <div className="grid min-w-[820px] grid-cols-5 bg-white/[0.04] text-sm font-semibold text-white">
        <div className="p-4">Category</div>
        <div className="border-l border-white/10 p-4 text-primary">TrailKit</div>
        <div className="border-l border-white/10 p-4">Enterprise MMPs</div>
        <div className="border-l border-white/10 p-4">Generic Affiliate Tools</div>
        <div className="border-l border-white/10 p-4">Creator CRMs</div>
      </div>
      {rows.map((row) => (
        <div key={row.category} className="grid min-w-[820px] grid-cols-5 border-t border-white/10 text-sm">
          <div className="p-4 font-medium text-white">{row.category}</div>
          <div className="border-l border-white/10 bg-primary/[0.04] p-4 text-white">{row.trailkit}</div>
          <div className="border-l border-white/10 p-4 text-muted">{row.mmp}</div>
          <div className="border-l border-white/10 p-4 text-muted">{row.affiliate}</div>
          <div className="border-l border-white/10 p-4 text-muted">{row.crm}</div>
        </div>
      ))}
    </div>
  );
}
