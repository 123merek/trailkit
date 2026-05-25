import { NextResponse } from "next/server";
import { getEvents, getSmartLink } from "@/lib/sample-data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const link = getSmartLink(id);

  if (!link) {
    return NextResponse.json({ error: "Smart link not found" }, { status: 404 });
  }

  return NextResponse.json({
    link,
    events: getEvents().filter((event) => event.smartLinkId === link.id),
  });
}
