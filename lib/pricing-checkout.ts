import { parseStripeCheckoutUrl } from "@/lib/env"
import { pricingTiers } from "@/lib/home-content"
import { STREAMQ_CONTACT_EMAIL } from "@/lib/site-links"

export type PricingPlanSlug = "player" | "premium" | "agency"
export type BillingCycle = "monthly" | "yearly"

export const GET_STARTED_PATH = "/get-started" as const

export const BILLING_CYCLES = [
  { value: "monthly" as const, label: "Monthly" },
  { value: "yearly" as const, label: "Yearly" },
] as const

const CHECKOUT_ENV_KEYS: Record<
  Exclude<PricingPlanSlug, "agency">,
  Record<BillingCycle, string>
> = {
  player: {
    monthly: "NEXT_PUBLIC_STRIPE_PLAYER_MONTHLY_URL",
    yearly: "NEXT_PUBLIC_STRIPE_PLAYER_YEARLY_URL",
  },
  premium: {
    monthly: "NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_URL",
    yearly: "NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_URL",
  },
}

export function isPricingPlanSlug(value: string): value is PricingPlanSlug {
  return value === "player" || value === "premium" || value === "agency"
}

export function isBillingCycle(value: string): value is BillingCycle {
  return value === "monthly" || value === "yearly"
}

export type PurchasableTier = Extract<
  (typeof pricingTiers)[number],
  { slug: PricingPlanSlug }
>

export function getPricingTierBySlug(slug: PricingPlanSlug): PurchasableTier | undefined {
  return pricingTiers.find((tier): tier is PurchasableTier => tier.slug === slug)
}

export function getCheckoutUrl(plan: PricingPlanSlug, billing: BillingCycle): string | null {
  if (plan === "agency") {
    return null
  }

  const envKey = CHECKOUT_ENV_KEYS[plan][billing]
  return parseStripeCheckoutUrl(process.env[envKey], envKey)
}

export function getGetStartedPath(
  plan: PricingPlanSlug,
  billing: BillingCycle = "monthly",
): string {
  const params = new URLSearchParams({ plan, billing })
  return `${GET_STARTED_PATH}?${params.toString()}`
}

export function getLicenseRequestMailto(
  plan: PricingPlanSlug,
  billing: BillingCycle,
  details?: { email?: string; company?: string },
): string {
  const tier = getPricingTierBySlug(plan)
  const planName = tier?.name ?? plan
  const price = billing === "monthly" ? tier?.monthlyPrice : tier?.yearlyPrice

  const subject = encodeURIComponent(`StreamQ ${planName} license — ${billing}`)
  const bodyLines = [
    "Hi StreamQ team,",
    "",
    plan === "agency"
      ? "I'd like to request a StreamQ Studio license for agency client work:"
      : "I'd like to purchase a production license:",
    `- Plan: ${planName}`,
    `- Billing: ${billing}${price ? ` (${price})` : ""}`,
    "",
    details?.email ? `Email: ${details.email}` : "Email:",
    details?.company ? `Company: ${details.company}` : "Company:",
    plan === "agency" ? "Active client projects (approx.):" : "Use case:",
    "",
  ]

  const body = encodeURIComponent(bodyLines.join("\n"))
  return `mailto:${STREAMQ_CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export function getPlanPrice(plan: PricingPlanSlug, billing: BillingCycle): string {
  const tier = getPricingTierBySlug(plan)

  if (!tier) {
    return ""
  }

  return billing === "monthly" ? tier.monthlyPrice : tier.yearlyPrice
}
