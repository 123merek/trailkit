import { NextResponse } from "next/server";
import { listPartners, listSmartLinks } from "@/lib/data";
import { getWorkspaceIdFromRequest } from "@/lib/security";

function csvEscape(value: string | number) {
  const stringValue = String(value);

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = await getWorkspaceIdFromRequest(request);
  const partnerId = url.searchParams.get("partnerId");
  const partners = (await listPartners(workspaceId)).filter((partner) => !partnerId || partner.id === partnerId);
  const links = await listSmartLinks(workspaceId);
  const rows = [
    ["partner_id", "partner_name", "partner_type", "links", "revenue_attributed", "payout_rate", "estimated_payout", "status"],
    ...partners.map((partner) => [
      partner.id,
      partner.name,
      partner.type,
      partner.links,
      partner.revenueAttributed.toFixed(2),
      partner.payoutRate,
      partner.estimatedPayout.toFixed(2),
      partner.status,
    ]),
    [],
    ["smart_link_id", "slug", "name", "source_type", "source_name", "revenue", "estimated_payout"],
    ...links
      .filter((link) => !partnerId || link.partnerId === partnerId)
      .map((link) => [
        link.id,
        link.slug,
        link.name,
        link.sourceType,
        link.sourceName,
        link.metrics.revenue.toFixed(2),
        link.metrics.payout.toFixed(2),
      ]),
  ];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=\"trailkit-payouts.csv\"",
    },
  });
}
