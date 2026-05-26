"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  persisted?: boolean;
  note?: string;
};

export function SmartLinkBuilder() {
  const router = useRouter();
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
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/76 p-5 shadow-[0_14px_35px_rgba(55,42,84,0.08)]">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#372a54]">
        <Wand2 className="h-4 w-4 text-[#765dff]" />
        Create smart link
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-[#72668a]">Link name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-11 w-full rounded-full border border-[#dfd4f4] bg-[#f8f4ff] px-4 text-sm text-[#372a54] outline-none transition focus:border-[#765dff]/60"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-[#72668a]">Source type</span>
          <select
            value={sourceType}
            onChange={(event) => setSourceType(event.target.value as SourceType)}
            className="mt-2 h-11 w-full rounded-full border border-[#dfd4f4] bg-[#f8f4ff] px-4 text-sm text-[#372a54] outline-none transition focus:border-[#765dff]/60"
          >
            {sourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-[#72668a]">Source name</span>
          <input
            value={sourceName}
            onChange={(event) => setSourceName(event.target.value)}
            className="mt-2 h-11 w-full rounded-full border border-[#dfd4f4] bg-[#f8f4ff] px-4 text-sm text-[#372a54] outline-none transition focus:border-[#765dff]/60"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-[#72668a]">Campaign</span>
          <input
            value={campaign}
            onChange={(event) => setCampaign(event.target.value)}
            className="mt-2 h-11 w-full rounded-full border border-[#dfd4f4] bg-[#f8f4ff] px-4 text-sm text-[#372a54] outline-none transition focus:border-[#765dff]/60"
          />
        </label>
      </div>
      <div className="mt-4 rounded-full border border-[#dfd4f4] bg-[#eee6ff] px-4 py-3 font-mono text-xs text-[#72668a]">
        Preview: /r/{previewSlug}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#765dff] px-4 text-sm font-semibold text-[#fffdf8] transition hover:bg-[#4e39dd] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Generate smart link
      </button>
      {created?.shortUrl ? (
        <div className="mt-4 rounded-[8px] border border-[#35d894]/25 bg-[#9cf5c7]/28 p-3">
          <p className="text-sm font-medium text-[#287a55]">Prototype link created</p>
          {created.note ? <p className="mt-1 text-xs text-[#72668a]">{created.note}</p> : null}
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all text-xs text-[#372a54]">{created.shortUrl}</code>
            <CopyButton value={created.shortUrl} label="Copy link" />
          </div>
        </div>
      ) : null}
    </form>
  );
}
