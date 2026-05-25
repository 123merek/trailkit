import { LinkPerformanceTable } from "@/components/dashboard/LinkPerformanceTable";
import { SmartLinkBuilder } from "@/components/dashboard/SmartLinkBuilder";
import { SmartLinkCard } from "@/components/dashboard/SmartLinkCard";
import { listSmartLinks } from "@/lib/data";

export default async function LinksPage() {
  const links = await listSmartLinks();

  return (
    <main className="px-4 py-6 md:px-8">
      <div>
        <p className="text-sm font-semibold text-primary">Smart links</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Create and compare growth links</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Build links for creators, affiliates, emails, QR codes, website buttons, paid UGC, referral partners, and custom campaigns.
        </p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <SmartLinkBuilder />
        <div className="grid gap-4 md:grid-cols-2">
          {links.slice(0, 4).map((link) => (
            <SmartLinkCard key={link.id} link={link} />
          ))}
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-white">All smart links</h2>
        <div className="mt-4 overflow-x-auto">
          <LinkPerformanceTable links={links} />
        </div>
      </section>
    </main>
  );
}
