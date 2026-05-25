import { nanoid } from "nanoid";
import { conversionRate, getDestinationForUserAgent, slugify } from "./utils";

export const sourceTypes = [
  "Creator",
  "Affiliate",
  "Email",
  "Website button",
  "QR code",
  "Paid UGC",
  "Referral partner",
  "Custom campaign",
] as const;

export type SourceType = (typeof sourceTypes)[number];

export type SmartLink = {
  id: string;
  slug: string;
  name: string;
  sourceType: SourceType;
  sourceName: string;
  campaign: string;
  partnerId?: string;
  partnerName?: string;
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  createdAt: string;
  metrics: {
    clicks: number;
    storeOpens: number;
    installs: number;
    trials: number;
    subscriptions: number;
    revenue: number;
    payout: number;
  };
};

export type Partner = {
  id: string;
  name: string;
  type: string;
  status: "active" | "review" | "paused";
  links: number;
  revenueAttributed: number;
  payoutRate: string;
  estimatedPayout: number;
};

export type TrailEvent = {
  id: string;
  eventType:
    | "click"
    | "store_open"
    | "first_open"
    | "trial_started"
    | "subscription_started"
    | "renewal"
    | "purchase"
    | "payout_calculated";
  smartLinkId: string;
  smartLinkName: string;
  sourceName: string;
  occurredAt: string;
  amount?: number;
  currency?: string;
  metadata: string;
};

export const demoApp = {
  name: "FocusForge",
  iosUrl: "https://apps.apple.com/app/focusforge/id123456789",
  androidUrl: "https://play.google.com/store/apps/details?id=com.trailkit.focusforge",
  fallbackUrl: "https://trailkit.dev/demo",
  customDomain: "go.focusforge.app",
  revenueWebhookUrl: "https://trailkit.dev/api/events/revenue",
  apiKey: "tk_live_x7...demo",
  sdkStatus: "Mocked first-open events",
};

export const partners: Partner[] = [
  {
    id: "ptr_maya",
    name: "Maya Chen",
    type: "Creator",
    status: "active",
    links: 3,
    revenueAttributed: 6820.5,
    payoutRate: "15% subscription revenue",
    estimatedPayout: 1023.08,
  },
  {
    id: "ptr_northstar",
    name: "Northstar Affiliates",
    type: "Affiliate",
    status: "review",
    links: 4,
    revenueAttributed: 4210,
    payoutRate: "20% first-year revenue",
    estimatedPayout: 842,
  },
  {
    id: "ptr_launchletter",
    name: "Launch Letter",
    type: "Email",
    status: "active",
    links: 2,
    revenueAttributed: 2390,
    payoutRate: "$75 qualified subscription",
    estimatedPayout: 375,
  },
  {
    id: "ptr_founderspod",
    name: "Founders Pod",
    type: "Referral partner",
    status: "paused",
    links: 1,
    revenueAttributed: 1180,
    payoutRate: "10% net revenue",
    estimatedPayout: 118,
  },
];

export const smartLinks: SmartLink[] = [
  {
    id: "lnk_demo_creator",
    slug: "demo-creator",
    name: "Maya launch video",
    sourceType: "Creator",
    sourceName: "Maya Chen",
    campaign: "Summer Creator Test",
    partnerId: "ptr_maya",
    partnerName: "Maya Chen",
    iosUrl: demoApp.iosUrl,
    androidUrl: demoApp.androidUrl,
    fallbackUrl: demoApp.fallbackUrl,
    utmSource: "maya-chen",
    utmMedium: "creator",
    utmCampaign: "summer-creator-test",
    createdAt: "2026-05-02T14:30:00.000Z",
    metrics: {
      clicks: 1842,
      storeOpens: 1410,
      installs: 386,
      trials: 112,
      subscriptions: 44,
      revenue: 6820.5,
      payout: 1023.08,
    },
  },
  {
    id: "lnk_northstar",
    slug: "northstar-deal",
    name: "Northstar partner page",
    sourceType: "Affiliate",
    sourceName: "Northstar Affiliates",
    campaign: "Partner Ramp",
    partnerId: "ptr_northstar",
    partnerName: "Northstar Affiliates",
    iosUrl: demoApp.iosUrl,
    androidUrl: demoApp.androidUrl,
    fallbackUrl: demoApp.fallbackUrl,
    utmSource: "northstar",
    utmMedium: "affiliate",
    utmCampaign: "partner-ramp",
    createdAt: "2026-05-07T10:10:00.000Z",
    metrics: {
      clicks: 1228,
      storeOpens: 914,
      installs: 244,
      trials: 86,
      subscriptions: 31,
      revenue: 4210,
      payout: 842,
    },
  },
  {
    id: "lnk_launch_letter",
    slug: "launch-letter",
    name: "Launch Letter issue 42",
    sourceType: "Email",
    sourceName: "Launch Letter",
    campaign: "Newsletter Test",
    partnerId: "ptr_launchletter",
    partnerName: "Launch Letter",
    iosUrl: demoApp.iosUrl,
    androidUrl: demoApp.androidUrl,
    fallbackUrl: demoApp.fallbackUrl,
    utmSource: "launch-letter",
    utmMedium: "email",
    utmCampaign: "newsletter-test",
    createdAt: "2026-05-10T09:00:00.000Z",
    metrics: {
      clicks: 936,
      storeOpens: 704,
      installs: 198,
      trials: 58,
      subscriptions: 24,
      revenue: 2390,
      payout: 375,
    },
  },
  {
    id: "lnk_site_button",
    slug: "homepage-ios-button",
    name: "Homepage App Store button",
    sourceType: "Website button",
    sourceName: "Marketing site",
    campaign: "Owned Web",
    iosUrl: demoApp.iosUrl,
    androidUrl: demoApp.androidUrl,
    fallbackUrl: demoApp.fallbackUrl,
    utmSource: "website",
    utmMedium: "app-button",
    utmCampaign: "owned-web",
    createdAt: "2026-05-11T13:45:00.000Z",
    metrics: {
      clicks: 2114,
      storeOpens: 1730,
      installs: 512,
      trials: 164,
      subscriptions: 63,
      revenue: 7815,
      payout: 0,
    },
  },
  {
    id: "lnk_qr_campus",
    slug: "campus-qr",
    name: "Campus poster QR",
    sourceType: "QR code",
    sourceName: "Campus Posters",
    campaign: "Offline Test",
    iosUrl: demoApp.iosUrl,
    androidUrl: demoApp.androidUrl,
    fallbackUrl: demoApp.fallbackUrl,
    utmSource: "campus-posters",
    utmMedium: "qr",
    utmCampaign: "offline-test",
    createdAt: "2026-05-15T16:20:00.000Z",
    metrics: {
      clicks: 488,
      storeOpens: 361,
      installs: 104,
      trials: 25,
      subscriptions: 11,
      revenue: 970,
      payout: 0,
    },
  },
];

export const revenueSeries = [
  { date: "May 01", clicks: 610, revenue: 920, installs: 118 },
  { date: "May 05", clicks: 840, revenue: 1410, installs: 176 },
  { date: "May 09", clicks: 970, revenue: 1885, installs: 215 },
  { date: "May 13", clicks: 1310, revenue: 2610, installs: 282 },
  { date: "May 17", clicks: 1480, revenue: 3495, installs: 326 },
  { date: "May 21", clicks: 1690, revenue: 4770, installs: 381 },
  { date: "May 25", clicks: 1904, revenue: 6080, installs: 436 },
];

export const events: TrailEvent[] = [
  {
    id: "evt_001",
    eventType: "click",
    smartLinkId: "lnk_demo_creator",
    smartLinkName: "Maya launch video",
    sourceName: "Maya Chen",
    occurredAt: "2026-05-25T14:32:00.000Z",
    metadata: "iOS visitor routed to App Store",
  },
  {
    id: "evt_002",
    eventType: "first_open",
    smartLinkId: "lnk_demo_creator",
    smartLinkName: "Maya launch video",
    sourceName: "Maya Chen",
    occurredAt: "2026-05-25T14:36:00.000Z",
    metadata: "Matched anonymous user anon_81f",
  },
  {
    id: "evt_003",
    eventType: "trial_started",
    smartLinkId: "lnk_demo_creator",
    smartLinkName: "Maya launch video",
    sourceName: "Maya Chen",
    occurredAt: "2026-05-25T14:41:00.000Z",
    metadata: "RevenueCat sandbox event",
  },
  {
    id: "evt_004",
    eventType: "subscription_started",
    smartLinkId: "lnk_northstar",
    smartLinkName: "Northstar partner page",
    sourceName: "Northstar Affiliates",
    occurredAt: "2026-05-25T13:58:00.000Z",
    amount: 119,
    currency: "USD",
    metadata: "Annual starter subscription",
  },
  {
    id: "evt_005",
    eventType: "payout_calculated",
    smartLinkId: "lnk_northstar",
    smartLinkName: "Northstar partner page",
    sourceName: "Northstar Affiliates",
    occurredAt: "2026-05-25T13:59:00.000Z",
    amount: 23.8,
    currency: "USD",
    metadata: "20% estimated partner payout",
  },
  {
    id: "evt_006",
    eventType: "purchase",
    smartLinkId: "lnk_launch_letter",
    smartLinkName: "Launch Letter issue 42",
    sourceName: "Launch Letter",
    occurredAt: "2026-05-25T13:16:00.000Z",
    amount: 79,
    currency: "USD",
    metadata: "Manual import matched by customer ID",
  },
  {
    id: "evt_007",
    eventType: "renewal",
    smartLinkId: "lnk_site_button",
    smartLinkName: "Homepage App Store button",
    sourceName: "Marketing site",
    occurredAt: "2026-05-25T12:50:00.000Z",
    amount: 149,
    currency: "USD",
    metadata: "Renewal attributed to owned web",
  },
  {
    id: "evt_008",
    eventType: "store_open",
    smartLinkId: "lnk_qr_campus",
    smartLinkName: "Campus poster QR",
    sourceName: "Campus Posters",
    occurredAt: "2026-05-25T12:12:00.000Z",
    metadata: "Android visitor routed to Google Play",
  },
];

export function getSmartLinks() {
  return smartLinks;
}

export function getSmartLink(idOrSlug: string) {
  return smartLinks.find((link) => link.id === idOrSlug || link.slug === idOrSlug);
}

export function getPartners() {
  return partners;
}

export function getEvents() {
  return events;
}

export function getDashboardMetrics() {
  const totals = smartLinks.reduce(
    (acc, link) => ({
      clicks: acc.clicks + link.metrics.clicks,
      storeOpens: acc.storeOpens + link.metrics.storeOpens,
      installs: acc.installs + link.metrics.installs,
      trials: acc.trials + link.metrics.trials,
      subscriptions: acc.subscriptions + link.metrics.subscriptions,
      revenue: acc.revenue + link.metrics.revenue,
      payout: acc.payout + link.metrics.payout,
    }),
    {
      clicks: 0,
      storeOpens: 0,
      installs: 0,
      trials: 0,
      subscriptions: 0,
      revenue: 0,
      payout: 0,
    },
  );

  return {
    totals,
    funnel: [
      { name: "Clicks", value: totals.clicks },
      { name: "Store opens", value: totals.storeOpens },
      { name: "Installs", value: totals.installs },
      { name: "Trials", value: totals.trials },
      { name: "Subscriptions", value: totals.subscriptions },
    ],
    conversion: {
      clickToInstall: conversionRate(totals.installs, totals.clicks),
      installToTrial: conversionRate(totals.trials, totals.installs),
      trialToPaid: conversionRate(totals.subscriptions, totals.trials),
    },
    revenueSeries,
  };
}

export function createPrototypeSmartLink(input: {
  name: string;
  sourceType: SourceType;
  sourceName: string;
  campaign: string;
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}) {
  const slugBase = slugify(input.name || input.sourceName || "trailkit-link");
  const slug = `${slugBase}-${nanoid(5).toLowerCase()}`;

  return {
    id: `lnk_${nanoid(10).toLowerCase()}`,
    slug,
    name: input.name,
    sourceType: input.sourceType,
    sourceName: input.sourceName,
    campaign: input.campaign,
    iosUrl: input.iosUrl,
    androidUrl: input.androidUrl,
    fallbackUrl: input.fallbackUrl,
    utmSource: input.utmSource ?? slugify(input.sourceName),
    utmMedium: input.utmMedium ?? slugify(input.sourceType),
    utmCampaign: input.utmCampaign ?? slugify(input.campaign),
    createdAt: new Date().toISOString(),
    metrics: {
      clicks: 0,
      storeOpens: 0,
      installs: 0,
      trials: 0,
      subscriptions: 0,
      revenue: 0,
      payout: 0,
    },
  };
}

export function simulateClick(slug: string, userAgent?: string | null) {
  const link = getSmartLink(slug);

  if (!link) {
    return null;
  }

  const routing = getDestinationForUserAgent(userAgent, link);

  return {
    clickId: `clk_${nanoid(12).toLowerCase()}`,
    smartLinkId: link.id,
    slug: link.slug,
    destination: routing.destination,
    platform: routing.platform,
    recordedAt: new Date().toISOString(),
    privacy:
      "MVP click simulation records no raw IP address and does not use fingerprinting.",
  };
}
