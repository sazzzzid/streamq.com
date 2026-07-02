import { JsonLdGraph } from "@/components/seo/json-ld"
import {
  buildFaqPageJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo"

export function HomeJsonLd() {
  return (
    <JsonLdGraph
      graphs={[
        buildOrganizationJsonLd(),
        buildWebSiteJsonLd(),
        buildSoftwareApplicationJsonLd(),
        buildFaqPageJsonLd(),
      ]}
    />
  )
}
