import { z } from "zod";
import { recordRevenue } from "./data";
import { safeCompare } from "./security";

const revenueCatEventSchema = z.object({
  api_version: z.string().optional(),
  event: z
    .object({
      id: z.string(),
      type: z.string(),
      app_user_id: z.string().optional(),
      original_app_user_id: z.string().optional(),
      product_id: z.string().optional(),
      currency: z.string().optional(),
      price: z.number().optional(),
      price_in_purchased_currency: z.number().optional(),
      event_timestamp_ms: z.number().optional(),
      purchased_at_ms: z.number().optional(),
      subscriber_attributes: z.record(z.string(), z.unknown()).optional(),
    })
    .passthrough(),
});

function readAttribute(attributes: Record<string, unknown> | undefined, key: string) {
  const value = attributes?.[key];

  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "value" in value && typeof value.value === "string") {
    return value.value;
  }

  return undefined;
}

function mapRevenueCatEventType(type: string) {
  switch (type) {
    case "INITIAL_PURCHASE":
      return "subscription_started";
    case "RENEWAL":
      return "renewal";
    case "NON_RENEWING_PURCHASE":
      return "purchase";
    case "TEST":
      return "purchase";
    default:
      return "purchase";
  }
}

export async function ingestRevenueCatWebhook(payload: unknown) {
  const parsed = revenueCatEventSchema.safeParse(payload);

  if (!parsed.success) {
    return { accepted: false, matched: false, error: "Invalid RevenueCat payload" };
  }

  const event = parsed.data.event;
  const slug =
    readAttribute(event.subscriber_attributes, "trailkit_slug") ??
    readAttribute(event.subscriber_attributes, "$trailkit_slug");
  const smartLinkId =
    readAttribute(event.subscriber_attributes, "trailkit_smart_link_id") ??
    readAttribute(event.subscriber_attributes, "$trailkit_smart_link_id");

  if (!slug && !smartLinkId) {
    return {
      accepted: true,
      matched: false,
      revenueCatEventId: event.id,
      note: "RevenueCat event accepted but not matched. Send trailkit_slug or trailkit_smart_link_id as a subscriber attribute.",
    };
  }

  const amount = event.price_in_purchased_currency ?? event.price ?? 0;
  const occurredAt = new Date(event.event_timestamp_ms ?? event.purchased_at_ms ?? Date.now()).toISOString();
  const result = await recordRevenue({
    smartLinkId,
    slug,
    customerId: event.app_user_id ?? event.original_app_user_id ?? "unknown_revenuecat_user",
    amount,
    currency: event.currency ?? "USD",
    productId: event.product_id,
    source: "RevenueCat",
    externalId: event.id,
    occurredAt,
    eventType: mapRevenueCatEventType(event.type),
  });

  return {
    accepted: true,
    matched: Boolean(result),
    revenueCatEventId: event.id,
    result,
  };
}

export function verifyRevenueCatAuthorization(request: Request) {
  const expected = process.env.REVENUECAT_WEBHOOK_AUTH;

  if (!expected) {
    return true;
  }

  const received = request.headers.get("authorization") ?? "";

  return safeCompare(received, expected);
}
