"use client";

import { useMemo, useState } from "react";
import { Loader2, Plus, Wand2 } from "lucide-react";
import { demoApp, sourceTypes, type SourceType } from "@/lib/sample-data";
import { slugify } from "@/lib/utils";
import { CopyButton } from "@/components/shared/CopyButton";

type CreatedLink = {
  link: {
    id: string;
    slug: string;
    name: string;
  };
  shortUrl: string;
};

export function SmartLinkBuilder() {
  const [name, setName] = useState("Creator launch story");
  const [sourceType, setSourceType] = useState<SourceType>("Creator");
  const [sourceName, setSourceName] = useState("New Partner");
  const [campaign, setCampaign] = useState("Private beta test");
  const [created, setCreated] = useState<CreatedLink | null>(null);
  const [loading, setLoading] = useState(false);

  const previewSlug = useMemo(() => slugify(name || sourceName || "trailkit-link"), [name, sourceName]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/links", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        sourceType,
        sourceName,
        campaign,
        iosUrl: demoApp.iosUrl,
        androidUrl: demoApp.androidUrl,
        fallbackUrl: demoApp.fallbackUrl,
      }),
    });

    setCreated(await response.json());
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Wand2 className="h-4 w-4 text-primary" />
        Create smart link
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-muted">Link name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-11 w-full rounded-[8px] border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-primary/60"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted">Source type</span>
          <select
            value={sourceType}
            onChange={(event) => setSourceType(event.target.value as SourceType)}
            className="mt-2 h-11 w-full rounded-[8px] border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-primary/60"
          >
            {sourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted">Source name</span>
          <input
            value={sourceName}
            onChange={(event) => setSourceName(event.target.value)}
            className="mt-2 h-11 w-full rounded-[8px] border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-primary/60"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted">Campaign</span>
          <input
            value={campaign}
            onChange={(event) => setCampaign(event.target.value)}
            className="mt-2 h-11 w-full rounded-[8px] border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-primary/60"
          />
        </label>
      </div>
      <div className="mt-4 rounded-[8px] border border-white/10 bg-black/20 p-3 font-mono text-xs text-muted">
        Preview: /r/{previewSlug}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Generate smart link
      </button>
      {created?.shortUrl ? (
        <div className="mt-4 rounded-[8px] border border-success/20 bg-success/10 p-3">
          <p className="text-sm font-medium text-success">Prototype link created</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all text-xs text-white">{created.shortUrl}</code>
            <CopyButton value={created.shortUrl} label="Copy link" />
          </div>
        </div>
      ) : null}
    </form>
  );
}
