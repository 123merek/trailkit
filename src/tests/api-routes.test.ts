import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST as clickPost } from "@/app/api/click/[slug]/route";
import { POST as csvImportPost } from "@/app/api/imports/revenue/route";
import { POST as linkPost } from "@/app/api/links/route";
import { GET as qrGet } from "@/app/api/links/[id]/qr/route";
import { GET as payoutExportGet } from "@/app/api/payouts/export/route";
import { GET as sdkHandshakeGet } from "@/app/api/sdk/handshake/route";
import { POST as revenueCatPost } from "@/app/api/webhooks/revenuecat/route";

describe("api route smoke tests", () => {
  it("creates a smart link through the API", async () => {
    const request = new NextRequest("http://localhost:3000/api/links", {
      method: "POST",
      body: JSON.stringify({
        name: "API route campaign",
        sourceType: "Custom campaign",
        sourceName: "API Smoke",
        campaign: "Route Tests",
        iosUrl: "https://apps.apple.com/app/focusforge/id123456789",
        androidUrl: "https://play.google.com/store/apps/details?id=com.trailkit.focusforge",
        fallbackUrl: "https://trailkit.dev/demo",
      }),
    });
    const response = await linkPost(request);
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.link.slug).toContain("api-route-campaign");
    expect(payload.shortUrl).toContain("/r/");
  });

  it("records a click without raw IP storage", async () => {
    const request = new NextRequest("http://localhost:3000/api/click/demo-creator", {
      method: "POST",
      headers: {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)",
        "x-forwarded-for": "203.0.113.20",
      },
    });
    const response = await clickPost(request, { params: Promise.resolve({ slug: "demo-creator" }) });
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.platform).toBe("ios");
    expect(payload.privacy).toContain("IP");
  });

  it("returns QR SVG for a smart link", async () => {
    const response = await qrGet(new Request("http://localhost:3000/api/links/demo-creator/qr"), {
      params: Promise.resolve({ id: "demo-creator" }),
    });
    const svg = await response.text();

    expect(response.headers.get("content-type")).toContain("image/svg+xml");
    expect(svg).toContain("<svg");
  });

  it("accepts unmatched RevenueCat webhooks with a 200 response", async () => {
    const request = new NextRequest("http://localhost:3000/api/webhooks/revenuecat", {
      method: "POST",
      body: JSON.stringify({
        api_version: "1.0",
        event: {
          id: "rc_test_event",
          type: "TEST",
          app_user_id: "cus_test",
          price: 0,
          currency: "USD",
        },
      }),
    });
    const response = await revenueCatPost(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.accepted).toBe(true);
    expect(payload.matched).toBe(false);
  });

  it("imports revenue CSV rows and exports payout CSV", async () => {
    const csv = "slug,customerId,amount,currency,productId,source\n" +
      "demo-creator,cus_csv_001,19.99,USD,monthly_pro,CSV smoke\n";
    const importResponse = await csvImportPost(
      new NextRequest("http://localhost:3000/api/imports/revenue", {
        method: "POST",
        body: csv,
      }),
    );
    const importPayload = await importResponse.json();
    const exportResponse = await payoutExportGet(new Request("http://localhost:3000/api/payouts/export"));
    const exportCsv = await exportResponse.text();

    expect(importPayload.rowsReceived).toBe(1);
    expect(exportResponse.headers.get("content-type")).toContain("text/csv");
    expect(exportCsv).toContain("partner_id");
  });

  it("documents the SDK handshake", async () => {
    const response = await sdkHandshakeGet();
    const payload = await response.json();

    expect(payload.version).toBe("0.1");
    expect(payload.privacy.fingerprinting).toBe(false);
  });
});
