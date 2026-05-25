import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { recordRevenue } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";
import { getPrisma } from "@/lib/prisma";

const rowSchema = z.object({
  slug: z.string().optional(),
  smartLinkId: z.string().optional(),
  customerId: z.string().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string().default("USD"),
  productId: z.string().optional(),
  source: z.string().default("CSV import"),
  occurredAt: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const workspaceId = await getWorkspaceIdFromRequest(request);
  const text = await request.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  let rowsAccepted = 0;
  const errors: { row: number; error: string }[] = [];

  for (const [index, record] of records.entries()) {
    const parsed = rowSchema.safeParse(record);

    if (!parsed.success) {
      errors.push({ row: index + 2, error: "Invalid revenue row" });
      continue;
    }

    const result = await recordRevenue({
      ...parsed.data,
      currency: parsed.data.currency || "USD",
      source: parsed.data.source || "CSV import",
      eventType: "purchase",
    });

    if (result) {
      rowsAccepted += 1;
    } else {
      errors.push({ row: index + 2, error: "Could not match smart link" });
    }
  }

  try {
    if (workspaceId) {
      await getPrisma().csvImport.create({
        data: {
          workspaceId,
          filename: request.headers.get("x-filename") ?? "revenue-import.csv",
          rowsReceived: records.length,
          rowsAccepted,
          rowsRejected: errors.length,
        },
      });
    }
  } catch {
    // Import events can still be accepted even if the summary record cannot be stored.
  }

  return NextResponse.json({
    rowsReceived: records.length,
    rowsAccepted,
    rowsRejected: errors.length,
    errors,
  });
}
