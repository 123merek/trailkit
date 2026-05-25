import { NextResponse } from "next/server";
import { listPartners } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

export async function GET(request: Request) {
  const workspaceId = await getWorkspaceIdFromRequest(request);

  return NextResponse.json({ partners: await listPartners(workspaceId) });
}
