"use client"

import { useId } from "react"
import type { BillingCycle, PricingPlanSlug } from "@/lib/pricing-checkout"
import { LicenseRequestForm } from "@/components/get-started/license-request-form"

interface LicenseRequestPanelProps {
  plan: PricingPlanSlug
  billing: BillingCycle
  bare?: boolean
}

export function LicenseRequestPanel({ plan, billing, bare = false }: LicenseRequestPanelProps) {
  const formId = useId()
  const emailId = `${formId}-email`
  const companyId = `${formId}-company`

  return (
    <LicenseRequestForm
      plan={plan}
      billing={billing}
      bare={bare}
      emailId={emailId}
      companyId={companyId}
    />
  )
}
