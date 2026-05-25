"use client";

import { useState } from "react";
import { Globe2, Loader2, Plus } from "lucide-react";

type DomainRecord = {
  id: string;
  hostname: string;
  status: string;
  verification: string;
};

export function CustomDomainPanel({ initialDomains = [] }: { initialDomains?: DomainRecord[] }) {
  const [domains, setDomains] = useState<DomainRecord[]>(initialDomains);
  const [hostname, setHostname] = useState("go.focusforge.app");
  const [loading, setLoading] = useState(false);

  async function refreshDomains() {
    const response = await fetch("/api/domains");
    const payload = (await response.json()) as { domains: DomainRecord[] };
    setDomains(payload.domains ?? []);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/domains", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hostname }),
    });
    await refreshDomains();
    setLoading(false);
  }

  return (
    <section className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2">
        <Globe2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-white">Custom domain setup</h2>
      </div>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={hostname}
          onChange={(event) => setHostname(event.target.value)}
          className="h-11 min-w-0 flex-1 rounded-[8px] border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-primary/60"
          placeholder="go.yourapp.com"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add domain
        </button>
      </form>
      <div className="mt-4 space-y-3">
        {domains.map((domain) => (
          <div key={domain.id} className="rounded-[8px] border border-white/10 bg-black/10 p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm text-white">{domain.hostname}</p>
              <span className="rounded-full border border-warning/20 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                {domain.status}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted">Add TXT record:</p>
            <code className="mt-1 block break-all rounded-[8px] border border-white/10 bg-black/20 p-2 text-xs text-primary">
              _trailkit.{domain.hostname} TXT {domain.verification}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}
