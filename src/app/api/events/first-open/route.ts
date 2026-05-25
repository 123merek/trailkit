import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordFirstOpen } from "@/lib/data";

const firstOpenSchema = z.object({
  smartLinkId: z.string().optional(),
  slug: z.string().optional(),
  anonymousUserId: z.string().min(3),
  occurredAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  const parsed = firstOpenSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid first-open payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const event = await recordFirstOpen(parsed.data);

  if (!event) {
    return NextResponse.json(
      {
        error: "Smart link not found",
        limitation:
          "The MVP needs a smartLinkId or slug. A mobile SDK would persist attribution IDs after install.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      accepted: true,
      event,
    },
    { status: 202 },
  );
}
