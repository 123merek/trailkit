import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
          keyHash: "sha256:demo-placeholder",
        },
      },
    },
  });

  const app = await prisma.app.create({
    data: {
      workspaceId: workspace.id,
      name: "FocusForge",
      bundleId: "com.trailkit.focusforge",
      iosUrl: "https://apps.apple.com/app/focusforge/id123456789",
      androidUrl: "https://play.google.com/store/apps/details?id=com.trailkit.focusforge",
      fallbackUrl: "https://trailkit.dev/demo",
      customDomain: "go.focusforge.app",
      revenueWebhookUrl: "https://trailkit.dev/api/events/revenue",
      sdkStatus: "mocked",
    },
  });

  const partners = await Promise.all([
    prisma.partner.create({
      data: { workspaceId: workspace.id, name: "Maya Chen", type: "Creator", email: "maya@example.com" },
    }),
    prisma.partner.create({
      data: { workspaceId: workspace.id, name: "Northstar Affiliates", type: "Affiliate", email: "ops@northstar.example" },
    }),
    prisma.partner.create({
      data: { workspaceId: workspace.id, name: "Launch Letter", type: "Email", email: "growth@launchletter.example" },
    }),
  ]);

  const campaign = await prisma.campaign.create({
    data: {
      workspaceId: workspace.id,
      name: "Summer Creator Test",
      channel: "Creator",
    },
  });

  const links = await Promise.all([
    prisma.smartLink.create({
      data: {
        appId: app.id,
        slug: "demo-creator",
        name: "Maya launch video",
        sourceType: "Creator",
        sourceName: "Maya Chen",
        campaignName: campaign.name,
        campaignId: campaign.id,
        partnerId: partners[0].id,
        iosUrl: app.iosUrl,
        androidUrl: app.androidUrl,
        fallbackUrl: app.fallbackUrl,
        utmSource: "maya-chen",
        utmMedium: "creator",
        utmCampaign: "summer-creator-test",
      },
    }),
    prisma.smartLink.create({
      data: {
        appId: app.id,
        slug: "northstar-deal",
        name: "Northstar partner page",
        sourceType: "Affiliate",
        sourceName: "Northstar Affiliates",
        campaignName: "Partner ramp",
        partnerId: partners[1].id,
        iosUrl: app.iosUrl,
        androidUrl: app.androidUrl,
        fallbackUrl: app.fallbackUrl,
        utmSource: "northstar",
        utmMedium: "affiliate",
        utmCampaign: "partner-ramp",
      },
    }),
    prisma.smartLink.create({
      data: {
        appId: app.id,
        slug: "launch-letter",
        name: "Launch Letter issue 42",
        sourceType: "Email",
        sourceName: "Launch Letter",
        campaignName: "Newsletter test",
        partnerId: partners[2].id,
        iosUrl: app.iosUrl,
        androidUrl: app.androidUrl,
        fallbackUrl: app.fallbackUrl,
        utmSource: "launch-letter",
        utmMedium: "email",
        utmCampaign: "newsletter-test",
      },
    }),
  ]);

  for (const link of links) {
    await prisma.click.createMany({
      data: [
        {
          smartLinkId: link.id,
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)",
          ipHash: "sha256:placeholder",
          referrer: "https://example.com",
          country: "US",
          deviceType: "ios",
          destination: link.iosUrl,
        },
        {
          smartLinkId: link.id,
          userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8)",
          ipHash: "sha256:placeholder",
          referrer: "https://example.com",
          country: "CA",
          deviceType: "android",
          destination: link.androidUrl,
        },
      ],
    });
  }

  await prisma.attributionEvent.createMany({
    data: [
      { smartLinkId: links[0].id, eventType: "first_open", anonymousUserId: "anon_1001" },
      { smartLinkId: links[0].id, eventType: "trial_started", anonymousUserId: "anon_1001" },
      { smartLinkId: links[0].id, eventType: "subscription_started", anonymousUserId: "anon_1001" },
      { smartLinkId: links[1].id, eventType: "first_open", anonymousUserId: "anon_2001" },
      { smartLinkId: links[2].id, eventType: "purchase", anonymousUserId: "anon_3001" },
    ],
  });

  await prisma.revenueEvent.createMany({
    data: [
      {
        smartLinkId: links[0].id,
        customerId: "cus_creator_001",
        amount: 249,
        currency: "USD",
        productId: "annual_pro",
        source: "RevenueCat",
      },
      {
        smartLinkId: links[1].id,
        customerId: "cus_affiliate_001",
        amount: 119,
        currency: "USD",
        productId: "monthly_team",
        source: "Manual import",
      },
      {
        smartLinkId: links[2].id,
        customerId: "cus_email_001",
        amount: 79,
        currency: "USD",
        productId: "annual_starter",
        source: "RevenueCat",
      },
    ],
  });

  await Promise.all([
    prisma.payoutRule.create({
      data: { partnerId: partners[0].id, ruleType: "commission", commissionPercent: 15, appliesTo: "subscription_revenue" },
    }),
    prisma.payoutRule.create({
      data: { partnerId: partners[1].id, ruleType: "commission", commissionPercent: 20, appliesTo: "first_year_revenue" },
    }),
    prisma.payoutRule.create({
      data: { partnerId: partners[2].id, ruleType: "fixed", fixedAmount: 75, appliesTo: "qualified_subscription" },
    }),
  ]);

  await prisma.payoutEstimate.createMany({
    data: [
      { partnerId: partners[0].id, smartLinkId: links[0].id, revenueAmount: 6820.5, payoutAmount: 1023.08, status: "estimated" },
      { partnerId: partners[1].id, smartLinkId: links[1].id, revenueAmount: 4210, payoutAmount: 842, status: "review" },
      { partnerId: partners[2].id, smartLinkId: links[2].id, revenueAmount: 2390, payoutAmount: 375, status: "estimated" },
    ],
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
