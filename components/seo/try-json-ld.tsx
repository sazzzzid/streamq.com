import { JsonLdGraph } from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd, buildSoftwareApplicationJsonLd } from "@/lib/seo"

export function TryJsonLd() {
  return (
    <JsonLdGraph
      graphs={[
        buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Try StreamQ Player", path: "/try" },
        ]),
        buildSoftwareApplicationJsonLd(),
      ]}
    />
  )
}
