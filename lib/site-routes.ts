import type { MetadataRoute } from "next"

/** Indexable marketing routes — keep in sync with app page routes. */
export const MARKETING_ROUTES = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/get-started",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/partners",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const satisfies ReadonlyArray<{
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
  priority: number
}>

/** Update when marketing pages materially change. Avoids noisy crawl signals on every deploy. */
export const SITE_LAST_UPDATED = new Date("2026-07-04")

export type MarketingRoute = (typeof MARKETING_ROUTES)[number]
