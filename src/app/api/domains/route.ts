import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { getWorkspaceIdFromRequest } from "@/lib/security";

const domainSchema = z.object({
  hostname: z
    .string()
    .min(3)
    .regex(/^[a-z0-9.-]+$/i),
  appId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const workspaceId = await getWorkspaceIdFromRequest(request);

  if (!workspaceId) {
    return NextResponse.json({ domains: [] });
  }

  const domains = await getPrisma().customDomain.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ domains });
}

export async function POST(request: NextRequest) {
  const workspaceId = await getWorkspaceIdFromRequest(request);
  const parsed = domainSchema.safeParse(await request.json());

  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace authentication required" }, { status: 401 });
  }

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid domain payload" }, { status: 400 });
  }

  const app =
    (parsed.data.appId
      ? await getPrisma().app.findFirst({ where: { id: parsed.data.appId, workspaceId } })
      : await getPrisma().app.findFirst({ where: { workspaceId }, orderBy: { createdAt: "asc" } })) ?? null;

  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  const verification = `trailkit-verify=${workspaceId.slice(0, 10)}-${Date.now().toString(36)}`;
  const domain = await getPrisma().customDomain.upsert({
    where: { hostname: parsed.data.hostname.toLowerCase() },
    update: { appId: app.id, status: "pending", verification },
    create: {
      workspaceId,
      appId: app.id,
      hostname: parsed.data.hostname.toLowerCase(),
      status: "pending",
      verification,
    },
  });

  return NextResponse.json(
    {
      domain,
      dns: {
        type: "TXT",
        name: `_trailkit.${domain.hostname}`,
        value: domain.verification,
      },
    },
    { status: 201 },
  );
}
