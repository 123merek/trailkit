import { NextResponse } from "next/server";
import { getEvents } from "@/lib/sample-data";

export async function GET() {
  return NextResponse.json({ events: getEvents() });
}
