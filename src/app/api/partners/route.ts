import { NextResponse } from "next/server";
import { getPartners } from "@/lib/sample-data";

export async function GET() {
  return NextResponse.json({ partners: getPartners() });
}
