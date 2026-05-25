import { NextResponse } from "next/server";
import { listEvents } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

export async function GET(request: Request) {
  const workspaceId = await getWorkspaceIdFromRequest(request);

  return NextResponse.json({ events: await listEvents(workspaceId) });
}
