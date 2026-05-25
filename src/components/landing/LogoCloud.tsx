const logos = ["Sub apps", "Indie tools", "Growth teams", "Mobile SaaS", "Creator tests"];

export function LogoCloud() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-center text-sm text-muted">
        Built for subscription apps, indie founders, and modern growth teams.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-16 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.03] text-sm font-medium text-white/70"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
