import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getWorkspaceIdFromRequest } from "@/lib/security";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const workspaceId = await getWorkspaceIdFromRequest(request);
  const { id } = await context.params;

  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace authentication required" }, { status: 401 });
  }

  const domain = await getPrisma().customDomain.findFirst({
    where: { id, workspaceId },
  });

  if (!domain) {
    return NextResponse.json({ error: "Domain not found" }, { status: 404 });
  }

  // MVP verification marks the record ready. Replace this with DNS TXT lookup before production use.
  const updated = await getPrisma().customDomain.update({
    where: { id: domain.id },
    data: { status: "verified", verifiedAt: new Date() },
  });

  return NextResponse.json({ domain: updated });
}
