import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless admin session: the cookie holds `<expiresAtMs>.<hmac>` signed with
 * ADMIN_SESSION_SECRET. No user data is stored. Changing the secret logs every
 * device out.
 */
export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  // Fail closed: without a strong secret nobody can sign in
  if (!secret || secret.length < 32) return null;
  return secret;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters)");
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidSessionToken(token: string | undefined) {
  const secret = getSecret();
  if (!secret || !token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;

  const expected = Buffer.from(sign(expiresAt, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;

  return Number(expiresAt) > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
