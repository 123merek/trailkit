import { NextResponse } from "next/server";
import { getDashboardMetrics, listSmartLinks } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

export async function GET(request: Request) {
  const workspaceId = await getWorkspaceIdFromRequest(request);

  return NextResponse.json({
    dashboard: await getDashboardMetrics(workspaceId),
    topLinks: (await listSmartLinks(workspaceId)).slice(0, 5),
  });
}
