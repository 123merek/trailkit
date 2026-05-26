const logos = ["Sub apps", "Indie tools", "Growth teams", "Mobile SaaS", "Creator tests"];

export function LogoCloud() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-center text-sm text-[#72668a]">
        Built for subscription apps, indie founders, and modern growth teams.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-16 items-center justify-center rounded-full border border-[#d8cdf7] bg-[#fffdf8]/72 text-sm font-medium text-[#5b4c7d]"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
