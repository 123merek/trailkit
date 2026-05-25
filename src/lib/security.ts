import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";
import { getPrisma } from "./prisma";

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function getBearerToken(request: Request) {
  const header = request.headers.get("authorization");

  if (header?.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }

  return request.headers.get("x-trailkit-api-key") ?? undefined;
}

export async function getWorkspaceIdFromRequest(request: Request) {
  const explicitWorkspace = request.headers.get("x-trailkit-workspace-id");
  const token = getBearerToken(request);

  if (token) {
    const envToken = process.env.TRAILKIT_API_KEY;

    if (envToken && safeCompare(token, envToken)) {
      return getDefaultWorkspaceId();
    }

    try {
      const apiKey = await getPrisma().apiKey.findFirst({
        where: {
          keyHash: sha256(token),
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        select: { id: true, workspaceId: true },
      });

      if (apiKey) {
        await getPrisma().apiKey.update({
          where: { id: apiKey.id },
          data: { lastUsedAt: new Date() },
        });

        return apiKey.workspaceId;
      }
    } catch {
      return explicitWorkspace ?? null;
    }
  }

  if (explicitWorkspace) {
    return explicitWorkspace;
  }

  if (process.env.TRAILKIT_REQUIRE_API_KEY === "true") {
    return null;
  }

  return getDefaultWorkspaceId();
}

export async function getDefaultWorkspaceId() {
  try {
    const workspace = await getPrisma().workspace.findFirst({
      orderBy: { createdAt: "asc" },
      select: { id: true },
    });

    return workspace?.id ?? null;
  } catch {
    return null;
  }
}

export function getClientIp(request: NextRequest | Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip") ?? undefined;
}

export function hashIp(ip: string | undefined) {
  if (!ip) {
    return undefined;
  }

  const salt = process.env.IP_HASH_SALT ?? process.env.TRAILKIT_API_KEY ?? "trailkit-dev-ip-salt";

  return `hmac-sha256:${createHmac("sha256", salt).update(ip).digest("hex")}`;
}

export function getClickExpiresAt() {
  const retentionDays = Number(process.env.CLICK_RETENTION_DAYS ?? "180");
  const date = new Date();
  date.setDate(date.getDate() + retentionDays);

  return date;
}
