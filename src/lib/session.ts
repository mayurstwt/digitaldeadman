import crypto from "node:crypto";

const sessionSecret =
  process.env.AUTH_SECRET || "change-this-auth-secret-before-production";

export const sessionCookieName = "ddm_session";

function sign(value: string) {
  return crypto.createHmac("sha256", sessionSecret).update(value).digest("hex");
}

export function createSessionValue(userId: string) {
  return `${userId}.${sign(userId)}`;
}

export function verifySessionValue(value?: string | null) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const parts = value.split(".");
  if (parts.length < 2) {
    return null;
  }

  const signature = parts.pop();
  const userId = parts.join(".");

  if (!userId || !signature) {
    return null;
  }

  const expected = sign(userId);

  if (signature.length !== expected.length) {
    return null;
  }

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8"),
    )
  ) {
    return null;
  }

  return userId;
}
