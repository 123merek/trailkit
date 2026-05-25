# TrailKit SDK Attribution Handshake

This is the first mobile SDK contract for TrailKit. It is intentionally small and privacy-conscious.

## Goals

- Persist a click or smart-link attribution trail through first app open when platform rules allow it.
- Avoid fingerprinting and raw IP storage.
- Give revenue integrations a durable customer or anonymous user key that can be matched back to a smart link.

## Redirect Step

When a user opens `/r/[slug]`, TrailKit records a click and routes to the App Store, Google Play, or fallback URL. The redirect may include supported attribution context such as:

```txt
trailkit_slug=demo-creator
trailkit_click_id=clk_123
trailkit_source=creator
trailkit_campaign=summer-creator-test
```

## First Open Step

The app SDK sends:

```json
{
  "slug": "demo-creator",
  "anonymousUserId": "anon_install_123",
  "occurredAt": "2026-05-25T21:00:00.000Z",
  "metadata": {
    "platform": "ios",
    "appVersion": "1.0.0",
    "sdkVersion": "0.1.0"
  }
}
```

Endpoint:

```txt
POST /api/events/first-open
```

## Revenue Step

Revenue events should include one of:

- `smartLinkId`
- `slug`
- a customer mapping created during first open
- RevenueCat subscriber attributes named `trailkit_slug` or `trailkit_smart_link_id`

## Privacy Limits

- No device fingerprinting.
- No ATT bypass claims.
- Raw IP addresses are not stored.
- Clicks get a retention date through `CLICK_RETENTION_DAYS`.
- Matching is reported as estimated unless a durable app event or revenue integration confirms it.

## Current API Contract

The machine-readable version is available at:

```txt
GET /api/sdk/handshake
```
