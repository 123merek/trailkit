import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSmartLink, listSmartLinks } from "@/lib/data";
import { demoApp, sourceTypes } from "@/lib/sample-data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

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

export async function GET(request: NextRequest) {
  const workspaceId = await getWorkspaceIdFromRequest(request);

  return NextResponse.json({ links: await listSmartLinks(workspaceId) });
}

export async function POST(request: NextRequest) {
  const parsed = createSmartLinkSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid smart link payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const workspaceId = await getWorkspaceIdFromRequest(request);
  const { link, persisted } = await createSmartLink(parsed.data, workspaceId);
  const origin = new URL(request.url).origin;

  return NextResponse.json(
    {
      link,
      shortUrl: `${origin}/r/${link.slug}`,
      persisted,
      note: persisted
        ? "Smart link persisted to the active workspace."
        : "Smart link returned from demo fallback because no writable database was available.",
    },
    { status: 201 },
  );
}
