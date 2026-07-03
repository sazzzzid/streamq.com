import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, ExternalLink } from "lucide-react"
import { LicenseRequestPanel } from "@/components/get-started/license-request-panel"
import { HashLink } from "@/components/site/hash-link"
import { GetStartedJsonLd } from "@/components/seo/get-started-json-ld"
import { getStartedPageMetadata } from "@/lib/seo"
import { pricingTiers } from "@/lib/home-content"
import {
  BILLING_CYCLES,
  getCheckoutUrl,
  getGetStartedPath,
  getPlanPrice,
  getPricingTierBySlug,
  isBillingCycle,
  isPricingPlanSlug,
  type BillingCycle,
  type PricingPlanSlug,
} from "@/lib/pricing-checkout"
import { STREAMQ_DEMO_ANCHOR, STREAMQ_HOME_ANCHORS } from "@/lib/site-links"
import { cn } from "@/lib/utils"

export const metadata: Metadata = getStartedPageMetadata

interface GetStartedPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function resolveSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

export default async function GetStartedPage({ searchParams }: GetStartedPageProps) {
  const params = await searchParams
  const planParam = resolveSearchParam(params.plan)
  const billingParam = resolveSearchParam(params.billing)

  if (planParam && !isPricingPlanSlug(planParam)) {
    notFound()
  }

  if (billingParam && !isBillingCycle(billingParam)) {
    notFound()
  }

  const plan: PricingPlanSlug = planParam && isPricingPlanSlug(planParam) ? planParam : "player"
  const billing: BillingCycle =
    billingParam && isBillingCycle(billingParam) ? billingParam : "monthly"

  const tier = getPricingTierBySlug(plan)
  const checkoutUrl = getCheckoutUrl(plan, billing)
  const price = getPlanPrice(plan, billing)
  const purchasablePlans = pricingTiers.filter((item) => item.slug !== "evaluation")

  if (!tier) {
    notFound()
  }

  return (
    <>
      <GetStartedJsonLd />
      <main id="main" className="section-lg bg-paper">
      <div className="container-brand editorial-stack">
        <div className="max-w-3xl space-y-5">
          <HashLink
            href={STREAMQ_HOME_ANCHORS.pricing}
            className="inline-flex items-center gap-2 font-heading text-sm font-bold text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to pricing
          </HashLink>

          <div className="space-y-3">
            <p className="eyebrow">Get started</p>
            <h1 className="section-title font-heading">Get your production license</h1>
            <p className="body-copy">
              Choose a plan and billing cycle, then checkout or request a license key. We typically
              reply within one business day with your production{" "}
              <code className="font-mono text-sm">sq_live_*</code> key.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <span className="text-sm font-medium text-ink">Plan</span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {purchasablePlans.map((item) => {
                  const cardPrice =
                    billing === "yearly" ? item.yearlyPrice : item.monthlyPrice
                  const cardSuffix = billing === "yearly" ? "/yr" : "/mo"

                  return (
                  <Link
                    key={item.slug}
                    href={getGetStartedPath(item.slug, billing)}
                    className={cn(
                      "card-product space-y-2 transition hover:-translate-y-0.5",
                      plan === item.slug && "ring-2 ring-orange",
                    )}
                    aria-current={plan === item.slug ? "true" : undefined}
                  >
                    <p className="eyebrow">{item.name}</p>
                    <p className="font-heading text-2xl font-bold text-ink">
                      {cardPrice}
                      <span className="text-base font-bold text-ink-soft">{cardSuffix}</span>
                    </p>
                    <p className="text-sm text-ink-soft">{item.audience}</p>
                  </Link>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium text-ink">Billing</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Billing cycle">
                {BILLING_CYCLES.map((option) => (
                  <Link
                    key={option.value}
                    href={getGetStartedPath(plan, option.value)}
                    className={cn(
                      "pill-tag",
                      billing === option.value && "bg-orange text-white",
                    )}
                    aria-current={billing === option.value ? "true" : undefined}
                  >
                    {option.label}
                    {option.value === "yearly" ? (
                      <span className="ml-1 opacity-80">· save ~15%</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card-static space-y-4">
              <div className="space-y-1">
                <p className="eyebrow">{tier.name} plan</p>
                <p className="feature-title text-4xl">
                  {price}
                  <span className="text-lg font-bold text-ink-soft">
                    /{billing === "monthly" ? "mo" : "yr"}
                  </span>
                </p>
              </div>

              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {checkoutUrl && plan !== "agency" ? (
              <div className="card-static space-y-5">
                <div className="space-y-2">
                  <p className="eyebrow">Self-serve checkout</p>
                  <h2 className="font-heading text-2xl font-bold text-ink">
                    Continue to secure checkout
                  </h2>
                  <p className="body-copy text-base text-ink-soft">
                    Pay with card. Your production license key is delivered automatically after
                    payment — no sales call required.
                  </p>
                </div>

                <a
                  href={checkoutUrl}
                  className="btn-primary w-full sm:w-fit"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`Checkout — ${price}/${billing === "monthly" ? "mo" : "yr"} (opens in new tab)`}
                >
                  Checkout — {price}/{billing === "monthly" ? "mo" : "yr"}
                  <ExternalLink className="size-5" aria-hidden="true" />
                </a>

                <p className="body-copy text-sm text-ink-soft">
                  Prefer to talk first? Use the license request form below or{" "}
                  <HashLink href={STREAMQ_DEMO_ANCHOR} className="font-bold text-orange hover:underline">
                    try the live demo
                  </HashLink>{" "}
                  before you buy.
                </p>
              </div>
            ) : (
              <div className="card-static space-y-3">
                <p className="eyebrow">License request</p>
                <h2 className="font-heading text-2xl font-bold text-ink">
                  {plan === "agency"
                    ? "Request a Studio license"
                    : `Request your ${tier.name} license`}
                </h2>
                <p className="body-copy text-base text-ink-soft">
                  {plan === "agency"
                    ? "Studio is invoiced manually — five production keys for client apps you deliver, plus a team onboarding call. We typically reply within one business day."
                    : "Online checkout is being set up. Send a license request and we&apos;ll reply with your production key and integration help — usually within one business day."}
                </p>
              </div>
            )}

            {!checkoutUrl || plan === "agency" ? (
              <LicenseRequestPanel plan={plan} billing={billing} />
            ) : null}

            {checkoutUrl && plan !== "agency" ? (
              <details className="card-static group">
                <summary className="cursor-pointer list-none font-heading text-lg font-bold text-ink marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    Need a quote or invoice instead?
                    <span
                      className="text-orange transition group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="mt-6 border-t border-line pt-6">
                  <LicenseRequestPanel plan={plan} billing={billing} bare />
                </div>
              </details>
            ) : null}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
