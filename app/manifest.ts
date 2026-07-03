import type { MetadataRoute } from "next"
import { SITE_DOMAIN, SITE_PRODUCT_NAME } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_PRODUCT_NAME,
    short_name: "StreamQ",
    description: `Commercial React video player SDK — ${SITE_DOMAIN}`,
    start_url: "/",
    display: "standalone",
    background_color: "#f3ecdf",
    theme_color: "#fff9f0",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
