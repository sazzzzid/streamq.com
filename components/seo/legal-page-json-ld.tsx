import { SubPageJsonLd } from "@/components/seo/subpage-json-ld"

interface LegalPageJsonLdProps {
  path: "/privacy" | "/terms"
  name: string
  description: string
  breadcrumbLabel: string
}

export function LegalPageJsonLd({
  path,
  name,
  description,
  breadcrumbLabel,
}: LegalPageJsonLdProps) {
  return (
    <SubPageJsonLd
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: breadcrumbLabel, path },
      ]}
      path={path}
      name={name}
      description={description}
    />
  )
}
