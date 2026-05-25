import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "TrailKit SDK attribution handshake",
    version: "0.1",
    privacy: {
      fingerprinting: false,
      rawIpStorage: false,
      idScope: "anonymous attribution id generated per install or app user",
    },
    flow: [
      "Smart link redirect creates click id and appends trailkit_click_id to the store/fallback URL when supported.",
      "App SDK reads pending attribution context on first open.",
      "SDK posts first_open with anonymousUserId, clickId or slug, app version, platform, and timestamp.",
      "Revenue integration posts subscription or purchase events with trailkit_slug, trailkit_smart_link_id, or customer mapping.",
      "TrailKit estimates payout using partner rules and marks the result for review.",
    ],
    firstOpenPayload: {
      slug: "demo-creator",
      anonymousUserId: "anon_install_123",
      occurredAt: new Date().toISOString(),
      metadata: {
        platform: "ios",
        appVersion: "1.0.0",
        sdkVersion: "0.1.0",
      },
    },
  });
}
