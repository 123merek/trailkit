import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordRevenue } from "@/lib/data";

const revenueSchema = z.object({
  smartLinkId: z.string().optional(),
  slug: z.string().optional(),
  customerId: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3).default("USD"),
  productId: z.string().optional(),
  source: z.string().default("Manual import"),
  externalId: z.string().optional(),
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

  const result = await recordRevenue(parsed.data);

  if (!result) {
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
      ...result,
    },
    { status: 202 },
  );
}
