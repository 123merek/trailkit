import { describe, expect, it } from "vitest";
import {
  calculatePayout,
  conversionRate,
  getDestinationForUserAgent,
  getPlatformFromUserAgent,
  slugify,
} from "@/lib/utils";

const destinations = {
  iosUrl: "https://apps.apple.com/app/demo/id123",
  androidUrl: "https://play.google.com/store/apps/details?id=demo",
  fallbackUrl: "https://example.com",
};

describe("attribution helpers", () => {
  it("detects common mobile platforms from user agents", () => {
    expect(getPlatformFromUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)")).toBe("ios");
    expect(getPlatformFromUserAgent("Mozilla/5.0 (Linux; Android 14; Pixel 8)")).toBe("android");
    expect(getPlatformFromUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)")).toBe("desktop");
  });

  it("routes by likely platform with a fallback", () => {
    expect(getDestinationForUserAgent("iPhone", destinations).destination).toBe(destinations.iosUrl);
    expect(getDestinationForUserAgent("Android", destinations).destination).toBe(destinations.androidUrl);
    expect(getDestinationForUserAgent("Desktop", destinations).destination).toBe(destinations.fallbackUrl);
  });

  it("keeps slugs URL friendly", () => {
    expect(slugify("Maya Chen Launch Video!")).toBe("maya-chen-launch-video");
  });

  it("calculates payout estimates", () => {
    expect(calculatePayout(1000, { ruleType: "commission", commissionPercent: 15 })).toBe(150);
    expect(calculatePayout(1000, { ruleType: "fixed", fixedAmount: 75 })).toBe(75);
  });

  it("guards conversion rates with empty denominators", () => {
    expect(conversionRate(5, 0)).toBe(0);
    expect(conversionRate(25, 100)).toBe(25);
  });
});
