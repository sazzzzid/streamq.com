import { SubPageJsonLd } from "@/components/seo/subpage-json-ld"
import { buildPricingOffersJsonLd } from "@/lib/seo"

const GET_STARTED_DESCRIPTION =
  "Get a production sq_live_* license for @streamq/player. Choose Player, Premium, or Studio for agencies — checkout or request at streamq.in."

export function GetStartedJsonLd() {
  return (
    <SubPageJsonLd
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Get Started", path: "/get-started" },
      ]}
      path="/get-started"
      name="Get Started — StreamQ Player License"
      description={GET_STARTED_DESCRIPTION}
      extraGraphs={[buildPricingOffersJsonLd()]}
    />
  )
}
