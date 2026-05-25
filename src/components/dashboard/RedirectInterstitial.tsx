"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

export function RedirectInterstitial({
  slug,
  destination,
  platform,
}: {
  slug: string;
  destination: string;
  platform: string;
}) {
  const [status, setStatus] = useState("Recording click");

  useEffect(() => {
    const payload = JSON.stringify({ source: "redirect_page" });
    const blob = new Blob([payload], { type: "application/json" });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(`/api/click/${slug}`, blob);
    } else {
      void fetch(`/api/click/${slug}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }

    const timer = window.setTimeout(() => {
      setStatus(`Opening ${platform === "ios" ? "App Store" : platform === "android" ? "Google Play" : "fallback page"}`);
      window.location.replace(destination);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [destination, platform, slug]);

  return (
    <main className="gradient-grid flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel w-full max-w-md rounded-[8px] p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[8px] border border-primary/30 bg-primary/10 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-white">Following the link trail</h1>
        <p className="mt-2 text-sm text-muted">{status}</p>
        <a
          href={destination}
          className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-semibold text-ink transition hover:bg-white"
        >
          Continue
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </main>
  );
}
