import type { MetadataRoute } from "next"
import { MARKETING_ROUTES, SITE_LAST_UPDATED } from "@/lib/site-routes"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKETING_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: SITE_LAST_UPDATED,
    changeFrequency,
    priority,
  }))
}
