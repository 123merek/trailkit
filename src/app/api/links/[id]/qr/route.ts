import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getSmartLink } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const link = await getSmartLink(id);

  if (!link) {
    return NextResponse.json({ error: "Smart link not found" }, { status: 404 });
  }

  const url = new URL(request.url);
  const target = `${getSiteUrl()}/r/${link.slug}`;
  const format = url.searchParams.get("format") ?? "svg";

  if (format === "png") {
    const png = await QRCode.toBuffer(target, {
      type: "png",
      width: 960,
      margin: 2,
      color: { dark: "#05070D", light: "#FFFFFF" },
    });

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "content-type": "image/png",
        "content-disposition": `attachment; filename="${link.slug}-qr.png"`,
      },
    });
  }

  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 2,
    color: { dark: "#05070D", light: "#FFFFFF" },
  });

  return new NextResponse(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "content-disposition": `inline; filename="${link.slug}-qr.svg"`,
    },
  });
}
