import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { RedirectInterstitial } from "@/components/dashboard/RedirectInterstitial";
import { getSmartLink } from "@/lib/sample-data";
import { getDestinationForUserAgent } from "@/lib/utils";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = getSmartLink(slug);

  if (!link) {
    notFound();
  }

  const headerList = await headers();
  const userAgent = headerList.get("user-agent");
  const routing = getDestinationForUserAgent(userAgent, link);

  return (
    <RedirectInterstitial
      slug={link.slug}
      destination={routing.destination}
      platform={routing.platform}
    />
  );
}
