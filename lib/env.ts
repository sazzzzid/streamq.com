import { PRODUCTION_SITE_URL, SITE_DOMAIN } from "./site-config"

const STRIPE_CHECKOUT_HOSTS = new Set([
  "checkout.stripe.com",
  "buy.stripe.com",
])

export function isProductionDeployment(): boolean {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production"
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  return (
    process.env.NODE_ENV === "production" &&
    (siteUrl === PRODUCTION_SITE_URL || siteUrl === undefined)
  )
}

export function shouldAllowSearchIndexing(): boolean {
  return isProductionDeployment()
}

function parseHttpsUrl(value: string, label: string): string | null {
  try {
    const parsed = new URL(value)

    if (parsed.protocol !== "https:") {
      console.warn(`[env] ${label} must use https:`)
      return null
    }

    return parsed.toString()
  } catch {
    console.warn(`[env] ${label} is not a valid URL`)
    return null
  }
}

export function parseSiteUrl(value: string | undefined): string | null {
  if (!value?.trim()) {
    return null
  }

  return parseHttpsUrl(value.trim(), "NEXT_PUBLIC_SITE_URL")
}

export function parseStripeCheckoutUrl(
  value: string | undefined,
  envKey: string,
): string | null {
  if (!value?.trim()) {
    return null
  }

  const url = parseHttpsUrl(value.trim(), envKey)

  if (!url) {
    return null
  }

  const host = new URL(url).hostname

  if (!STRIPE_CHECKOUT_HOSTS.has(host)) {
    console.warn(`[env] ${envKey} must point to a Stripe checkout host`)
    return null
  }

  return url
}

/** Validate optional overrides at build time. Production defaults to streamq.in. */
export function assertProductionEnv(): void {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return
  }

  const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

  if (!siteUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a valid https URL when set (e.g. https://streamq.in).",
    )
  }
}

export function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")

  if (configured) {
    return configured
  }

  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_URL
  }

  if (process.env.VERCEL_URL) {
    const vercelHost = process.env.VERCEL_URL.replace(/\/$/, "")

    if (vercelHost === SITE_DOMAIN || vercelHost === `www.${SITE_DOMAIN}`) {
      return PRODUCTION_SITE_URL
    }

    return `https://${vercelHost}`
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL
  }

  return "http://localhost:3000"
}
