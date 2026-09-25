import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidSessionToken } from "./session";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/**
 * Call at the top of every Server Action. Server Actions are public POST
 * endpoints, so the proxy redirect alone is not enough protection.
 */
export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}
