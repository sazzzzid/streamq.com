import { JsonLdGraph } from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo"

export interface SubPageJsonLdProps {
  breadcrumbs: ReadonlyArray<{ name: string; path: string }>
  path: string
  name: string
  description: string
  extraGraphs?: ReadonlyArray<Record<string, unknown>>
}

export function SubPageJsonLd({
  breadcrumbs,
  path,
  name,
  description,
  extraGraphs = [],
}: SubPageJsonLdProps) {
  return (
    <JsonLdGraph
      graphs={[
        buildBreadcrumbJsonLd(breadcrumbs),
        buildWebPageJsonLd({ path, name, description }),
        ...extraGraphs,
      ]}
    />
  )
}
