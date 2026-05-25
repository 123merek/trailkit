import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value > 999 ? 0 : 2,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 44);
}

export type Platform = "ios" | "android" | "desktop";

export function getPlatformFromUserAgent(userAgent = ""): Platform {
  const ua = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return "ios";
  }

  if (/android/.test(ua)) {
    return "android";
  }

  return "desktop";
}

export function getDestinationForUserAgent(
  userAgent: string | null | undefined,
  destinations: {
    iosUrl: string;
    androidUrl: string;
    fallbackUrl: string;
  },
) {
  const platform = getPlatformFromUserAgent(userAgent ?? "");

  if (platform === "ios") {
    return { platform, destination: destinations.iosUrl };
  }

  if (platform === "android") {
    return { platform, destination: destinations.androidUrl };
  }

  return { platform, destination: destinations.fallbackUrl };
}

export function calculatePayout(
  revenueAmount: number,
  rule: { ruleType: string; commissionPercent?: number | null; fixedAmount?: number | null },
) {
  if (rule.ruleType === "fixed") {
    return rule.fixedAmount ?? 0;
  }

  return revenueAmount * ((rule.commissionPercent ?? 0) / 100);
}

export function conversionRate(numerator: number, denominator: number) {
  if (!denominator) {
    return 0;
  }

  return (numerator / denominator) * 100;
}
