import { NextRequest, NextResponse } from "next/server";
import { ingestRevenueCatWebhook, verifyRevenueCatAuthorization } from "@/lib/revenuecat";

export async function POST(request: NextRequest) {
  if (!verifyRevenueCatAuthorization(request)) {
    return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
  }

  const payload = await request.json();
  const result = await ingestRevenueCatWebhook(payload);

  if (!result.accepted) {
    return NextResponse.json(result, { status: 400 });
  }

  // RevenueCat retries non-200 responses, so accepted-but-unmatched events still return 200.
  return NextResponse.json(result);
}
