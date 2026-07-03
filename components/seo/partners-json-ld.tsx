import { SubPageJsonLd } from "@/components/seo/subpage-json-ld"
import { buildPartnersServiceJsonLd, partnersPageMetadata } from "@/lib/seo"

const PARTNERS_DESCRIPTION =
  "StreamQ Studio for React agencies — five production keys on one invoice, onboarding, and integration help. B2B volume licensing for client video projects."

export function PartnersJsonLd() {
  const title =
    typeof partnersPageMetadata.title === "string"
      ? partnersPageMetadata.title
      : "Studio for Agencies — StreamQ Volume Licensing"

  return (
    <SubPageJsonLd
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Agencies", path: "/partners" },
      ]}
      path="/partners"
      name={title}
      description={PARTNERS_DESCRIPTION}
      extraGraphs={[buildPartnersServiceJsonLd()]}
    />
  )
}
