import { NextRequest, NextResponse } from "next/server";
import { simulateClick } from "@/lib/sample-data";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const userAgent = request.headers.get("user-agent");
  const result = simulateClick(slug, userAgent);

  if (!result) {
    return NextResponse.json({ error: "Smart link not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 201 });
}
