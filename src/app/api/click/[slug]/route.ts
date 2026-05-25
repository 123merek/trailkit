import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/data";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const result = await recordClick({ slug, request });

  if (!result) {
    return NextResponse.json({ error: "Smart link not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 201 });
}
