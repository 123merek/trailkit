import { NextResponse } from "next/server";
import { getSmartLink, listEvents } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const workspaceId = await getWorkspaceIdFromRequest(request);
  const link = await getSmartLink(id, workspaceId);

  if (!link) {
    return NextResponse.json({ error: "Smart link not found" }, { status: 404 });
  }

  return NextResponse.json({
    link,
    events: (await listEvents(workspaceId)).filter((event) => event.smartLinkId === link.id),
  });
}
