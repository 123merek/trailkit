import { PartnerPayoutCard } from "@/components/dashboard/PartnerPayoutCard";
import { getPartners } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export default function PartnersPage() {
  const partners = getPartners();
  const payoutTotal = partners.reduce((sum, partner) => sum + partner.estimatedPayout, 0);
  const revenueTotal = partners.reduce((sum, partner) => sum + partner.revenueAttributed, 0);

  return (
    <main className="px-4 py-6 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Partners</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Payout estimates</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Partner-level revenue and payout estimates for creators, affiliates, emails, and referral sources.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-muted">Attributed revenue</p>
            <p className="metric-tabular mt-1 text-xl font-semibold text-white">{formatCurrency(revenueTotal)}</p>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-muted">Estimated payout</p>
            <p className="metric-tabular mt-1 text-xl font-semibold text-white">{formatCurrency(payoutTotal)}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <PartnerPayoutCard key={partner.id} partner={partner} />
        ))}
      </div>
    </main>
  );
}
