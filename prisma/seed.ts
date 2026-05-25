import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
import {
  demoApp,
  partners as demoPartners,
  smartLinks as demoSmartLinks,
  type SmartLink,
} from "../src/lib/sample-data";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();
const demoApiKey = process.env.TRAILKIT_API_KEY ?? "tk_test_replace_me";
const baseDate = new Date("2026-05-25T15:00:00.000Z");

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function minutesAgo(minutes: number) {
  return new Date(baseDate.getTime() - minutes * 60_000);
}

function hmacPlaceholder(value: string) {
  return `hmac-sha256:${sha256(value)}`;
}

function linkDestination(link: SmartLink, index: number) {
  if (index % 3 === 0) {
    return { deviceType: "ios", destination: link.iosUrl, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)" };
  }

  if (index % 3 === 1) {
    return { deviceType: "android", destination: link.androidUrl, userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8)" };
  }

  return { deviceType: "desktop", destination: link.fallbackUrl, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)" };
}

function clickRows(link: SmartLink, linkIndex: number) {
  return Array.from({ length: link.metrics.clicks }, (_, index) => {
    const destination = linkDestination(link, index);

    return {
      smartLinkId: link.id,
      timestamp: minutesAgo((index % 5_000) + linkIndex * 11),
      userAgent: destination.userAgent,
      ipHash: hmacPlaceholder(`seed:${link.slug}:${index}`),
      referrer: index % 4 === 0 ? "https://instagram.com" : index % 4 === 1 ? "https://google.com" : "https://example.com",
      country: index % 5 === 0 ? "CA" : index % 7 === 0 ? "GB" : "US",
      deviceType: destination.deviceType,
      destination: destination.destination,
      expiresAt: new Date("2026-11-21T00:00:00.000Z"),
      createdAt: minutesAgo((index % 5_000) + linkIndex * 11),
    };
  });
}

function attributionRows(
  link: SmartLink,
  eventType: "store_open" | "first_open" | "trial_started" | "subscription_started",
  count: number,
  offset: number,
) {
  return Array.from({ length: count }, (_, index) => ({
    smartLinkId: link.id,
    eventType,
    anonymousUserId: `anon_${slugify(link.slug)}_${eventType}_${index}`,
    occurredAt: minutesAgo((index % 5_000) + offset),
    metadata: JSON.stringify({
      seed: true,
      source: link.sourceName,
      campaign: link.campaign,
    }),
  }));
}

async function main() {
  await prisma.csvImport.deleteMany();
  await prisma.customDomain.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.user.deleteMany();
  await prisma.payoutEstimate.deleteMany();
  await prisma.payoutRule.deleteMany();
  await prisma.revenueEvent.deleteMany();
  await prisma.attributionEvent.deleteMany();
  await prisma.click.deleteMany();
  await prisma.smartLink.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.app.deleteMany();
  await prisma.workspace.deleteMany();

  const workspace = await prisma.workspace.create({
    data: {
      name: "TrailKit Demo Workspace",
      apiKeys: {
        create: {
          name: "Demo ingest key",
          keyHash: sha256(demoApiKey),
          prefix: demoApiKey.slice(0, 8),
          scopes: "links:write,events:write,exports:read",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "founder@trailkit.dev",
      name: "TrailKit Founder",
      memberships: {
        create: {
          workspaceId: workspace.id,
          role: "owner",
        },
      },
      sessions: {
        create: {
          tokenHash: sha256("demo-session"),
          expiresAt: new Date("2027-01-01T00:00:00.000Z"),
        },
      },
    },
  });

  const app = await prisma.app.create({
    data: {
      workspaceId: workspace.id,
      name: demoApp.name,
      bundleId: "com.trailkit.focusforge",
      iosUrl: demoApp.iosUrl,
      androidUrl: demoApp.androidUrl,
      fallbackUrl: demoApp.fallbackUrl,
      customDomain: demoApp.customDomain,
      revenueWebhookUrl: demoApp.revenueWebhookUrl,
      sdkStatus: "mocked",
    },
  });

  await prisma.customDomain.create({
    data: {
      workspaceId: workspace.id,
      appId: app.id,
      hostname: demoApp.customDomain,
      status: "pending",
      verification: `trailkit-verify=${workspace.id.slice(0, 10)}`,
    },
  });

  await prisma.partner.createMany({
    data: demoPartners.map((partner) => ({
      id: partner.id,
      workspaceId: workspace.id,
      name: partner.name,
      type: partner.type,
      status: partner.status,
      email: `${slugify(partner.name)}@example.com`,
    })),
  });

  const uniqueCampaigns = [...new Map(demoSmartLinks.map((link) => [link.campaign, link])).values()];

  await prisma.campaign.createMany({
    data: uniqueCampaigns.map((link) => ({
      id: `campaign:${workspace.id}:${slugify(link.campaign)}`,
      workspaceId: workspace.id,
      name: link.campaign,
      channel: link.sourceType,
    })),
  });

  await prisma.smartLink.createMany({
    data: demoSmartLinks.map((link) => ({
      id: link.id,
      appId: app.id,
      slug: link.slug,
      name: link.name,
      sourceType: link.sourceType,
      sourceName: link.sourceName,
      campaignName: link.campaign,
      campaignId: `campaign:${workspace.id}:${slugify(link.campaign)}`,
      partnerId: link.partnerId,
      iosUrl: link.iosUrl,
      androidUrl: link.androidUrl,
      fallbackUrl: link.fallbackUrl,
      utmSource: link.utmSource,
      utmMedium: link.utmMedium,
      utmCampaign: link.utmCampaign,
      createdAt: new Date(link.createdAt),
    })),
  });

  for (const [linkIndex, link] of demoSmartLinks.entries()) {
    await prisma.click.createMany({ data: clickRows(link, linkIndex) });

    await prisma.attributionEvent.createMany({
      data: [
        ...attributionRows(link, "store_open", link.metrics.storeOpens, linkIndex * 17),
        ...attributionRows(link, "first_open", link.metrics.installs, linkIndex * 17 + 2),
        ...attributionRows(link, "trial_started", link.metrics.trials, linkIndex * 17 + 4),
        ...attributionRows(link, "subscription_started", link.metrics.subscriptions, linkIndex * 17 + 6),
      ],
    });

    if (link.metrics.revenue > 0) {
      await prisma.revenueEvent.create({
        data: {
          smartLinkId: link.id,
          customerId: `seed_customer_${link.slug}`,
          amount: link.metrics.revenue,
          currency: "USD",
          productId: link.sourceType === "Website button" ? "annual_pro_owned" : "annual_pro",
          source: "Seed aggregate",
          externalId: `seed_revenue_${link.slug}`,
          occurredAt: minutesAgo(linkIndex * 23 + 3),
        },
      });

      await prisma.attributionEvent.create({
        data: {
          smartLinkId: link.id,
          eventType: link.sourceType === "Website button" ? "renewal" : "purchase",
          anonymousUserId: `seed_customer_${link.slug}`,
          occurredAt: minutesAgo(linkIndex * 23 + 3),
          metadata: JSON.stringify({
            seed: true,
            amount: link.metrics.revenue,
            currency: "USD",
          }),
        },
      });
    }
  }

  await Promise.all([
    prisma.payoutRule.create({
      data: { partnerId: "ptr_maya", ruleType: "commission", commissionPercent: 15, appliesTo: "subscription_revenue" },
    }),
    prisma.payoutRule.create({
      data: { partnerId: "ptr_northstar", ruleType: "commission", commissionPercent: 20, appliesTo: "first_year_revenue" },
    }),
    prisma.payoutRule.create({
      data: { partnerId: "ptr_launchletter", ruleType: "fixed", fixedAmount: 75, appliesTo: "qualified_subscription" },
    }),
    prisma.payoutRule.create({
      data: { partnerId: "ptr_founderspod", ruleType: "commission", commissionPercent: 10, appliesTo: "net_revenue" },
    }),
  ]);

  await prisma.payoutEstimate.createMany({
    data: demoSmartLinks
      .filter((link) => link.partnerId && link.metrics.payout > 0)
      .map((link) => ({
        partnerId: link.partnerId as string,
        smartLinkId: link.id,
        revenueAmount: link.metrics.revenue,
        payoutAmount: link.metrics.payout,
        status: link.slug === "northstar-deal" ? "review" : "estimated",
      })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
