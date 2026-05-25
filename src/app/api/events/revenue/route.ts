import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSmartLink } from "@/lib/sample-data";

const revenueSchema = z.object({
  smartLinkId: z.string().optional(),
  slug: z.string().optional(),
  customerId: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3).default("USD"),
  productId: z.string().optional(),
  source: z.string().default("Manual import"),
  occurredAt: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = revenueSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid revenue payload", details: parsed.error.flatten() },
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
          "Revenue events need an attribution key, smartLinkId, slug, or durable customer mapping.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      accepted: true,
      event: {
        id: `evt_revenue_${Date.now()}`,
        smartLinkId: link.id,
        customerId: parsed.data.customerId,
        amount: parsed.data.amount,
        currency: parsed.data.currency,
        productId: parsed.data.productId,
        source: parsed.data.source,
        occurredAt: parsed.data.occurredAt ?? new Date().toISOString(),
      },
      payoutEstimate:
        link.partnerId && link.metrics.revenue > 0
          ? {
              partnerId: link.partnerId,
              basis: "Demo estimate only",
              amount: Math.round(parsed.data.amount * 15) / 100,
            }
          : null,
    },
    { status: 202 },
  );
}
