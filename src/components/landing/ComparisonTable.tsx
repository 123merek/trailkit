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
    <div className="overflow-hidden rounded-[8px] border border-[#d8cdf7] bg-[#fffdf8]/78 shadow-2xl">
      <div className="grid min-w-[820px] grid-cols-5 bg-[#eee6ff] text-sm font-semibold text-[#372a54]">
        <div className="p-4">Category</div>
        <div className="border-l border-[#d8cdf7] p-4 text-[#765dff]">TrailKit</div>
        <div className="border-l border-[#d8cdf7] p-4">Enterprise MMPs</div>
        <div className="border-l border-[#d8cdf7] p-4">Generic Affiliate Tools</div>
        <div className="border-l border-[#d8cdf7] p-4">Creator CRMs</div>
      </div>
      {rows.map((row) => (
        <div key={row.category} className="grid min-w-[820px] grid-cols-5 border-t border-[#d8cdf7] text-sm">
          <div className="p-4 font-medium text-[#372a54]">{row.category}</div>
          <div className="border-l border-[#d8cdf7] bg-[#765dff]/[0.07] p-4 font-medium text-[#372a54]">{row.trailkit}</div>
          <div className="border-l border-[#d8cdf7] p-4 text-[#72668a]">{row.mmp}</div>
          <div className="border-l border-[#d8cdf7] p-4 text-[#72668a]">{row.affiliate}</div>
          <div className="border-l border-[#d8cdf7] p-4 text-[#72668a]">{row.crm}</div>
        </div>
      ))}
    </div>
  );
}
