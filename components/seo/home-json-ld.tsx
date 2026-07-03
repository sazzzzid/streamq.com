import { JsonLdGraph } from "@/components/seo/json-ld"
import {
  buildFaqPageJsonLd,
  buildOrganizationJsonLd,
  buildProductJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  DEFAULT_OG_DESCRIPTION,
} from "@/lib/seo"

export function HomeJsonLd() {
  return (
    <JsonLdGraph
      graphs={[
        buildOrganizationJsonLd(),
        buildWebSiteJsonLd(),
        buildSoftwareApplicationJsonLd(),
        buildProductJsonLd(),
        buildWebPageJsonLd({
          path: "/",
          name: "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
          description: DEFAULT_OG_DESCRIPTION,
        }),
        buildFaqPageJsonLd(),
      ]}
    />
  )
}
