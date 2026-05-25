import { NextResponse } from "next/server";
import { getDashboardMetrics, getSmartLinks } from "@/lib/sample-data";

export async function GET() {
  return NextResponse.json({
    dashboard: getDashboardMetrics(),
    topLinks: getSmartLinks().slice(0, 5),
  });
}
