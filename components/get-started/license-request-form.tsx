"use client"

import { useState, type FormEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  getLicenseRequestMailto,
  type BillingCycle,
  type PricingPlanSlug,
} from "@/lib/pricing-checkout"
import { STREAMQ_CONTACT_EMAIL, STREAMQ_CONTACT_MAILTO } from "@/lib/site-links"

interface LicenseRequestFormProps {
  plan: PricingPlanSlug
  billing: BillingCycle
  bare?: boolean
  emailId: string
  companyId: string
}

export function LicenseRequestForm({
  plan,
  billing,
  bare = false,
  emailId,
  companyId,
}: LicenseRequestFormProps) {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextMailto = getLicenseRequestMailto(plan, billing, {
      email: email.trim() || undefined,
      company: company.trim() || undefined,
    })

    setMailtoUrl(nextMailto)
    setStatusMessage("Opening your email app…")

    window.setTimeout(() => {
      window.location.href = nextMailto
    }, 0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={bare ? "space-y-5" : "card-static space-y-5"}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor={emailId}>Work email</Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-2xl px-4 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={companyId}>Company (optional)</Label>
        <Input
          id={companyId}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Your company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="h-12 rounded-2xl px-4 text-base"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-fit">
        {plan === "agency" ? "Request Studio license" : "Request license key"}
      </button>

      <div className="space-y-2" aria-live="polite">
        {statusMessage ? (
          <p className="body-copy text-sm font-bold text-ink">{statusMessage}</p>
        ) : null}
        {mailtoUrl ? (
          <p className="body-copy text-sm text-ink-soft">
            Email didn&apos;t open?{" "}
            <a href={mailtoUrl} className="font-bold text-orange hover:underline">
              Open license request in email
            </a>{" "}
            or email{" "}
            <a href={STREAMQ_CONTACT_MAILTO} className="font-bold text-orange hover:underline">
              {STREAMQ_CONTACT_EMAIL}
            </a>{" "}
            directly.
          </p>
        ) : (
          <p className="body-copy text-sm text-ink-soft">
            Opens your email client with plan details pre-filled. We typically respond within one
            business day with your production <code className="font-mono">sq_live_*</code> key.
          </p>
        )}
      </div>
    </form>
  )
}
