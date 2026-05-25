import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSmartLink } from "@/lib/sample-data";

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

  const idOrSlug = parsed.data.smartLinkId ?? parsed.data.slug;
  const link = idOrSlug ? getSmartLink(idOrSlug) : undefined;

  if (!link) {
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
      event: {
        id: `evt_first_open_${Date.now()}`,
        eventType: "first_open",
        smartLinkId: link.id,
        anonymousUserId: parsed.data.anonymousUserId,
        occurredAt: parsed.data.occurredAt ?? new Date().toISOString(),
      },
    },
    { status: 202 },
  );
}
