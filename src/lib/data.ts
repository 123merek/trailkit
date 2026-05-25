import { nanoid } from "nanoid";
import { getPrisma } from "./prisma";
import {
  createPrototypeSmartLink,
  getDashboardMetrics as getSampleDashboardMetrics,
  getEvents as getSampleEvents,
  getPartners as getSamplePartners,
  getSmartLink as getSampleSmartLink,
  getSmartLinks as getSampleSmartLinks,
  revenueSeries,
  sourceTypes,
  type Partner,
  type SmartLink,
  type SourceType,
  type TrailEvent,
} from "./sample-data";
import {
  calculatePayout,
  conversionRate,
  getDestinationForUserAgent,
  slugify,
} from "./utils";
import { getClickExpiresAt, getClientIp, hashIp } from "./security";

const sourceTypeSet = new Set<string>(sourceTypes);

function toSourceType(value: string): SourceType {
  return sourceTypeSet.has(value) ? (value as SourceType) : "Custom campaign";
}

function demoMetricsForSlug(slug: string) {
  return getSampleSmartLink(slug)?.metrics;
}

function mapSmartLink(row: {
  id: string;
  slug: string;
  name: string;
  sourceType: string;
  sourceName: string;
  campaignName: string | null;
  campaign?: { name: string } | null;
  partnerId: string | null;
  partner?: { name: string } | null;
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  createdAt: Date;
  clicks?: unknown[];
  events?: { eventType: string }[];
  revenueEvents?: { amount: number }[];
  payoutEstimates?: { payoutAmount: number }[];
}): SmartLink {
  const demoMetrics = demoMetricsForSlug(row.slug);
  const events = row.events ?? [];
  const revenue = row.revenueEvents?.reduce((sum, event) => sum + event.amount, 0) ?? 0;
  const payout = row.payoutEstimates?.reduce((sum, estimate) => sum + estimate.payoutAmount, 0) ?? 0;
  const metrics =
    demoMetrics ??
    {
      clicks: row.clicks?.length ?? 0,
      storeOpens: events.filter((event) => event.eventType === "store_open").length,
      installs: events.filter((event) => event.eventType === "first_open").length,
      trials: events.filter((event) => event.eventType === "trial_started").length,
      subscriptions: events.filter((event) => event.eventType === "subscription_started").length,
      revenue,
      payout,
    };

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    sourceType: toSourceType(row.sourceType),
    sourceName: row.sourceName,
    campaign: row.campaignName ?? row.campaign?.name ?? "Unassigned",
    partnerId: row.partnerId ?? undefined,
    partnerName: row.partner?.name,
    iosUrl: row.iosUrl,
    androidUrl: row.androidUrl,
    fallbackUrl: row.fallbackUrl,
    utmSource: row.utmSource ?? slugify(row.sourceName),
    utmMedium: row.utmMedium ?? slugify(row.sourceType),
    utmCampaign: row.utmCampaign ?? slugify(row.campaignName ?? "campaign"),
    createdAt: row.createdAt.toISOString(),
    metrics,
  };
}

async function getDefaultApp(workspaceId: string | null) {
  if (!workspaceId) {
    return null;
  }

  return getPrisma().app.findFirst({
    where: { workspaceId },
    orderBy: { createdAt: "asc" },
  });
}

export async function listSmartLinks(workspaceId?: string | null) {
  try {
    const app = await getDefaultApp(workspaceId ?? (await getFirstWorkspaceId()));

    if (!app) {
      return getSampleSmartLinks();
    }

    const rows = await getPrisma().smartLink.findMany({
      where: { app: { workspaceId: app.workspaceId } },
      include: {
        campaign: true,
        partner: true,
        clicks: true,
        events: true,
        revenueEvents: true,
        payoutEstimates: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return rows.length ? rows.map(mapSmartLink) : getSampleSmartLinks();
  } catch {
    return getSampleSmartLinks();
  }
}

export async function getSmartLink(idOrSlug: string, workspaceId?: string | null) {
  try {
    const row = await getPrisma().smartLink.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        ...(workspaceId ? { app: { workspaceId } } : {}),
      },
      include: {
        campaign: true,
        partner: true,
        clicks: true,
        events: true,
        revenueEvents: true,
        payoutEstimates: true,
      },
    });

    return row ? mapSmartLink(row) : getSampleSmartLink(idOrSlug);
  } catch {
    return getSampleSmartLink(idOrSlug);
  }
}

export async function createSmartLink(
  input: {
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
  },
  workspaceId?: string | null,
) {
  try {
    const app = await getDefaultApp(workspaceId ?? (await getFirstWorkspaceId()));

    if (!app) {
      return { link: createPrototypeSmartLink(input), persisted: false };
    }

    const slugBase = slugify(input.name || input.sourceName || "trailkit-link");
    let slug = slugBase;
    const existing = await getPrisma().smartLink.findUnique({ where: { slug } });

    if (existing) {
      slug = `${slugBase}-${nanoid(5).toLowerCase()}`;
    }

    const campaign = await getPrisma().campaign.upsert({
      where: {
        id: `campaign:${app.workspaceId}:${slugify(input.campaign)}`,
      },
      update: { name: input.campaign, channel: input.sourceType },
      create: {
        id: `campaign:${app.workspaceId}:${slugify(input.campaign)}`,
        workspaceId: app.workspaceId,
        name: input.campaign,
        channel: input.sourceType,
      },
    });

    const partner = await getPrisma().partner.findFirst({
      where: {
        workspaceId: app.workspaceId,
        name: input.sourceName,
      },
    });

    const row = await getPrisma().smartLink.create({
      data: {
        appId: app.id,
        slug,
        name: input.name,
        sourceType: input.sourceType,
        sourceName: input.sourceName,
        campaignName: input.campaign,
        campaignId: campaign.id,
        partnerId: partner?.id,
        iosUrl: input.iosUrl,
        androidUrl: input.androidUrl,
        fallbackUrl: input.fallbackUrl,
        utmSource: input.utmSource ?? slugify(input.sourceName),
        utmMedium: input.utmMedium ?? slugify(input.sourceType),
        utmCampaign: input.utmCampaign ?? slugify(input.campaign),
      },
      include: {
        campaign: true,
        partner: true,
        clicks: true,
        events: true,
        revenueEvents: true,
        payoutEstimates: true,
      },
    });

    return { link: mapSmartLink(row), persisted: true };
  } catch {
    return { link: createPrototypeSmartLink(input), persisted: false };
  }
}

export async function recordClick({
  slug,
  request,
}: {
  slug: string;
  request: Request;
}) {
  const userAgent = request.headers.get("user-agent");
  const link = await getSmartLink(slug);

  if (!link) {
    return null;
  }

  const routing = getDestinationForUserAgent(userAgent, link);

  try {
    const row = await getPrisma().smartLink.findUnique({ where: { slug: link.slug } });

    if (row) {
      const click = await getPrisma().click.create({
        data: {
          smartLinkId: row.id,
          userAgent,
          ipHash: hashIp(getClientIp(request)),
          referrer: request.headers.get("referer"),
          country: request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry"),
          deviceType: routing.platform,
          destination: routing.destination,
          expiresAt: getClickExpiresAt(),
        },
      });

      await getPrisma().attributionEvent.create({
        data: {
          smartLinkId: row.id,
          eventType: "store_open",
          occurredAt: new Date(),
          metadata: JSON.stringify({
            destination: routing.destination,
            platform: routing.platform,
            clickId: click.id,
          }),
        },
      });

      return {
        clickId: click.id,
        smartLinkId: row.id,
        slug: link.slug,
        destination: routing.destination,
        platform: routing.platform,
        recordedAt: click.timestamp.toISOString(),
        privacy: "Raw IP addresses are not stored. TrailKit records a salted hash and does not use fingerprinting.",
      };
    }
  } catch {
    // The demo fallback keeps redirects working without a writable database.
  }

  return {
    clickId: `clk_${nanoid(12).toLowerCase()}`,
    smartLinkId: link.id,
    slug: link.slug,
    destination: routing.destination,
    platform: routing.platform,
    recordedAt: new Date().toISOString(),
    privacy: "MVP click fallback records no raw IP address and does not use fingerprinting.",
  };
}

export async function listPartners(workspaceId?: string | null): Promise<Partner[]> {
  try {
    const rows = await getPrisma().partner.findMany({
      where: workspaceId ? { workspaceId } : undefined,
      include: {
        smartLinks: true,
        payoutRules: true,
        payoutEstimates: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (!rows.length) {
      return getSamplePartners();
    }

    return rows.map((row) => {
      const revenueAttributed = row.payoutEstimates.reduce((sum, estimate) => sum + estimate.revenueAmount, 0);
      const estimatedPayout = row.payoutEstimates.reduce((sum, estimate) => sum + estimate.payoutAmount, 0);
      const rule = row.payoutRules[0];

      return {
        id: row.id,
        name: row.name,
        type: row.type,
        status: row.status as Partner["status"],
        links: row.smartLinks.length,
        revenueAttributed,
        payoutRate: rule
          ? rule.ruleType === "fixed"
            ? `$${rule.fixedAmount ?? 0} ${rule.appliesTo}`
            : `${rule.commissionPercent ?? 0}% ${rule.appliesTo}`
          : "No payout rule",
        estimatedPayout,
      };
    });
  } catch {
    return getSamplePartners();
  }
}

export async function listEvents(workspaceId?: string | null): Promise<TrailEvent[]> {
  try {
    const events = await getPrisma().attributionEvent.findMany({
      where: workspaceId ? { smartLink: { app: { workspaceId } } } : undefined,
      include: { smartLink: true },
      orderBy: { occurredAt: "desc" },
      take: 100,
    });

    if (!events.length) {
      return getSampleEvents();
    }

    return events.map((event) => ({
      id: event.id,
      eventType: event.eventType as TrailEvent["eventType"],
      smartLinkId: event.smartLinkId,
      smartLinkName: event.smartLink.name,
      sourceName: event.smartLink.sourceName,
      occurredAt: event.occurredAt.toISOString(),
      metadata: event.metadata ?? "Persisted event",
    }));
  } catch {
    return getSampleEvents();
  }
}

export async function getDashboardMetrics(workspaceId?: string | null) {
  const links = await listSmartLinks(workspaceId);
  const totals = links.reduce(
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

  if (!links.length) {
    return getSampleDashboardMetrics();
  }

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

export async function recordFirstOpen(input: {
  smartLinkId?: string;
  slug?: string;
  anonymousUserId: string;
  occurredAt?: string;
  metadata?: unknown;
}) {
  const link = await getSmartLink(input.smartLinkId ?? input.slug ?? "");

  if (!link) {
    return null;
  }

  try {
    const event = await getPrisma().attributionEvent.create({
      data: {
        smartLinkId: link.id,
        eventType: "first_open",
        anonymousUserId: input.anonymousUserId,
        occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
        metadata: JSON.stringify(input.metadata ?? {}),
      },
    });

    return event;
  } catch {
    return {
      id: `evt_first_open_${Date.now()}`,
      smartLinkId: link.id,
      eventType: "first_open",
      anonymousUserId: input.anonymousUserId,
      occurredAt: input.occurredAt ?? new Date().toISOString(),
    };
  }
}

export async function recordRevenue(input: {
  smartLinkId?: string;
  slug?: string;
  customerId: string;
  amount: number;
  currency: string;
  productId?: string;
  source: string;
  externalId?: string;
  occurredAt?: string;
  eventType?: TrailEvent["eventType"];
}) {
  const link = await getSmartLink(input.smartLinkId ?? input.slug ?? "");

  if (!link) {
    return null;
  }

  try {
    const revenueEvent = input.externalId
      ? await getPrisma().revenueEvent.upsert({
          where: {
            source_externalId: {
              source: input.source,
              externalId: input.externalId,
            },
          },
          update: {
            amount: input.amount,
            currency: input.currency,
            productId: input.productId,
            occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
          },
          create: {
            smartLinkId: link.id,
            customerId: input.customerId,
            amount: input.amount,
            currency: input.currency,
            productId: input.productId,
            source: input.source,
            externalId: input.externalId,
            occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
          },
        })
      : await getPrisma().revenueEvent.create({
          data: {
            smartLinkId: link.id,
            customerId: input.customerId,
            amount: input.amount,
            currency: input.currency,
            productId: input.productId,
            source: input.source,
            occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
          },
        });

    await getPrisma().attributionEvent.create({
      data: {
        smartLinkId: link.id,
        eventType: input.eventType ?? "purchase",
        anonymousUserId: input.customerId,
        occurredAt: revenueEvent.occurredAt,
        metadata: JSON.stringify({
          revenueEventId: revenueEvent.id,
          source: input.source,
          productId: input.productId,
          amount: input.amount,
          currency: input.currency,
        }),
      },
    });

    const smartLinkRow = await getPrisma().smartLink.findUnique({
      where: { id: link.id },
      include: { partner: { include: { payoutRules: true } } },
    });
    const rule = smartLinkRow?.partner?.payoutRules[0];
    const payoutAmount = rule ? calculatePayout(input.amount, rule) : 0;
    const payoutEstimate =
      smartLinkRow?.partnerId && payoutAmount > 0
        ? await getPrisma().payoutEstimate.create({
            data: {
              partnerId: smartLinkRow.partnerId,
              smartLinkId: link.id,
              revenueAmount: input.amount,
              payoutAmount,
              status: "estimated",
            },
          })
        : null;

    return { revenueEvent, payoutEstimate };
  } catch {
    return {
      revenueEvent: {
        id: `evt_revenue_${Date.now()}`,
        smartLinkId: link.id,
        amount: input.amount,
        currency: input.currency,
        source: input.source,
      },
      payoutEstimate: null,
    };
  }
}

export async function getFirstWorkspaceId() {
  try {
    const workspace = await getPrisma().workspace.findFirst({
      orderBy: { createdAt: "asc" },
      select: { id: true },
    });

    return workspace?.id ?? null;
  } catch {
    return null;
  }
}

export async function listCustomDomains(workspaceId?: string | null) {
  try {
    const activeWorkspaceId = workspaceId ?? (await getFirstWorkspaceId());

    if (!activeWorkspaceId) {
      return [];
    }

    return getPrisma().customDomain.findMany({
      where: { workspaceId: activeWorkspaceId },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}
