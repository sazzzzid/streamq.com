import type { MetadataRoute } from "next"
import { shouldAllowSearchIndexing } from "@/lib/env"
import { absoluteUrl } from "@/lib/seo"
import { PRODUCTION_SITE_URL } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  if (!shouldAllowSearchIndexing()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: PRODUCTION_SITE_URL,
  }
}
