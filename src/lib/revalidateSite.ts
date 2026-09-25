/** Cache tags understood by the public site's /api/revalidate endpoint. */
export type SiteCacheTag = "tours" | "activities" | "hero-slides" | "offers" | "posts";

/**
 * Tell the public website (tranquilsrilanka.com) to drop its cached copy of
 * the given content so edits show up immediately instead of within an hour.
 *
 * Never throws: a failed refresh must not fail the save itself — the site
 * still picks up changes on its hourly revalidation.
 *
 * Requires SITE_URL and SITE_REVALIDATE_SECRET (same value as the site's
 * REVALIDATE_SECRET) in the environment.
 */
export async function revalidateSite(tags: SiteCacheTag[]) {
  const siteUrl = process.env.SITE_URL;
  const secret = process.env.SITE_REVALIDATE_SECRET;

  if (!siteUrl || !secret) {
    console.warn("[revalidateSite] SITE_URL or SITE_REVALIDATE_SECRET not set — public site will update within 1 hour");
    return;
  }

  try {
    const res = await fetch(`${siteUrl.replace(/\/$/, "")}/api/revalidate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error(`[revalidateSite] ${res.status} ${await res.text().catch(() => "")}`);
    }
  } catch (error) {
    console.error("[revalidateSite] request failed:", error);
  }
}
