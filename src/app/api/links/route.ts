import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createPrototypeSmartLink,
  demoApp,
  getSmartLinks,
  sourceTypes,
} from "@/lib/sample-data";

const createSmartLinkSchema = z.object({
  name: z.string().min(2),
  sourceType: z.enum(sourceTypes),
  sourceName: z.string().min(2),
  campaign: z.string().min(2),
  iosUrl: z.string().url().default(demoApp.iosUrl),
  androidUrl: z.string().url().default(demoApp.androidUrl),
  fallbackUrl: z.string().url().default(demoApp.fallbackUrl),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({ links: getSmartLinks() });
}

export async function POST(request: NextRequest) {
  const parsed = createSmartLinkSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid smart link payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const link = createPrototypeSmartLink(parsed.data);
  const origin = new URL(request.url).origin;

  return NextResponse.json(
    {
      link,
      shortUrl: `${origin}/r/${link.slug}`,
      note: "Prototype links are returned immediately. Persist them with Prisma in the sellable MVP.",
    },
    { status: 201 },
  );
}
