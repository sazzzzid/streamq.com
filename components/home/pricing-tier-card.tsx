import Link from "next/link"
import { Check } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
import { TierBadgeRow } from "@/components/home/tier-badge"
import type { PricingTier } from "@/lib/home-content"
import { getGetStartedPath } from "@/lib/pricing-checkout"
import { STREAMQ_NPM_URL, STREAMQ_DEMO_ANCHOR, STREAMQ_PARTNERS_PATH } from "@/lib/site-links"
import { cn } from "@/lib/utils"

function TierPrice({ monthlyPrice, yearlyPrice }: Pick<PricingTier, "monthlyPrice" | "yearlyPrice">) {
  if (yearlyPrice) {
    return (
      <div className="card-price-block">
        <p className="card-price">
          {monthlyPrice}
          <span className="card-price-unit">/mo</span>
        </p>
        <p className="card-price-alt">or {yearlyPrice}/yr</p>
      </div>
    )
  }

  return (
    <div className="card-price-block">
      <p className="card-price">{monthlyPrice}</p>
    </div>
  )
}

function TierFeatureList({ features }: { features: readonly string[] }) {
  return (
    <ul className="card-feature-list">
      {features.map((feature) => (
        <li key={feature}>
          <Check className="card-feature-icon" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

function TierActions({ tier }: { tier: PricingTier }) {
  return (
    <div className="mt-auto flex flex-col gap-3 border-t border-line pt-5">
      {tier.slug === "evaluation" ? (
        <HashLink href={STREAMQ_DEMO_ANCHOR} className="btn-outline btn-sm w-fit">
          Try it out
        </HashLink>
      ) : tier.slug === "agency" ? (
        <Link href={STREAMQ_PARTNERS_PATH} className="btn-outline btn-sm w-fit">
          Studio for agencies
        </Link>
      ) : (
        <Link
          href={getGetStartedPath(tier.slug)}
          className={cn("btn-sm w-fit", tier.highlighted ? "btn-primary" : "btn-outline")}
        >
          {tier.slug === "premium" ? "Get Premium" : "Get license"}
        </Link>
      )}

      {tier.slug === "evaluation" || tier.slug === "player" ? (
        <a
          href={STREAMQ_NPM_URL}
          className="card-inline-link tap-target inline-flex items-center"
          rel="noopener noreferrer"
          target="_blank"
        >
          Docs &amp; implementation →
        </a>
      ) : null}
    </div>
  )
}

export function PricingTierCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={cn(
        "card flex h-full flex-col gap-6",
        tier.highlighted ? "card ring-2 ring-orange" : "card-static",
      )}
    >
      <header className="space-y-4">
        <TierBadgeRow badges={tier.badges} />

        <div className="space-y-1">
          <h3 className="card-tier-title">{tier.name}</h3>
          <p className="card-tier-lead">{tier.audience}</p>
        </div>

        <TierPrice monthlyPrice={tier.monthlyPrice} yearlyPrice={tier.yearlyPrice} />
      </header>

      <TierFeatureList features={tier.features} />

      <TierActions tier={tier} />
    </article>
  )
}
