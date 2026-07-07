import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Check, ExternalLink } from "lucide-react"
import { LicenseRequestPanel } from "@/components/get-started/license-request-panel"
import { PartnersJsonLd } from "@/components/seo/partners-json-ld"
import { HashLink } from "@/components/site/hash-link"
import { pricingTiers } from "@/lib/home-content"
import {
  agencyBenefits,
  agencyTrustNote,
  partnerOnboarding,
  partnersIntro,
  pitchAssets,
  sowBoilerplate,
  studioBillingOptions,
  studioHowItWorks,
  verticalPlaybooks,
  whiteLabelKit,
} from "@/lib/partners-content"
import { studioVolumeNote } from "@/lib/pricing-guide"
import { getGetStartedPath } from "@/lib/pricing-checkout"
import { partnersPageMetadata } from "@/lib/seo"
import { STREAMQ_HOME_ANCHORS } from "@/lib/site-links"

export const metadata: Metadata = partnersPageMetadata

const studioTier = pricingTiers.find((tier) => tier.slug === "agency")

export default function PartnersPage() {
  return (
    <>
      <PartnersJsonLd />
      <main id="main" className="section-lg bg-paper">
      <div className="container-brand editorial-stack">
        <div className="max-w-3xl space-y-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-heading text-sm font-bold text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <div className="space-y-3">
            <span className="sticker w-fit">{partnersIntro.sticker}</span>
            <p className="eyebrow">{partnersIntro.eyebrow}</p>
            <h1 className="section-title font-heading">{partnersIntro.title}</h1>
            <p className="body-copy text-lg">{partnersIntro.description}</p>
          </div>

          <p className="body-copy rounded-2xl border border-line bg-white/60 p-4 text-sm text-ink-soft">
            {agencyTrustNote}
          </p>
        </div>

        {studioTier ? (
          <section aria-labelledby="studio-tier-heading" className="card-static space-y-5">
            <div className="space-y-2">
              <p className="eyebrow">Studio license</p>
              <h2 id="studio-tier-heading" className="feature-title text-3xl">
                {studioTier.name}
              </h2>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="feature-title text-4xl">
                  {studioTier.monthlyPrice}
                  <span className="text-lg font-bold text-ink-soft">/mo</span>
                </p>
                <p className="body-copy text-base text-ink-soft">or {studioTier.yearlyPrice}/yr</p>
              </div>
              <p className="text-sm font-bold text-orange">{studioTier.audience}</p>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {studioTier.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <p className="body-copy text-sm text-ink-soft">{studioVolumeNote}</p>

            <div className="flex flex-wrap gap-3">
              <a href="#apply" className="btn-primary">
                Request Studio license
              </a>
              <Link href={getGetStartedPath("agency")} className="btn-outline">
                Monthly or yearly billing
              </Link>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="studio-how-heading" className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{studioHowItWorks.eyebrow}</p>
            <h2 id="studio-how-heading" className="feature-title text-2xl">
              {studioHowItWorks.title}
            </h2>
            <p className="body-copy max-w-2xl">{studioHowItWorks.description}</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {studioHowItWorks.steps.map((step, index) => (
              <li key={step.title} className="card-product space-y-2">
                <span className="sticker text-xs">Step {index + 1}</span>
                <p className="font-heading text-lg font-bold text-ink">{step.title}</p>
                <p className="body-copy text-base text-ink-soft">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="agency-benefits-heading" className="space-y-6">
          <h2 id="agency-benefits-heading" className="feature-title text-2xl">
            Built for client delivery
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agencyBenefits.map((item) => (
              <li key={item.title} className="card-product space-y-2">
                <p className="font-heading text-lg font-bold text-ink">{item.title}</p>
                <p className="body-copy text-base text-ink-soft">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="billing-options-heading" className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{studioBillingOptions.eyebrow}</p>
            <h2 id="billing-options-heading" className="feature-title text-2xl">
              {studioBillingOptions.title}
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {studioBillingOptions.options.map((option) => (
              <li key={option.name} className="card-product space-y-2">
                <p className="font-heading text-lg font-bold text-ink">{option.name}</p>
                <p className="body-copy text-base text-ink-soft">{option.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="white-label-heading" className="card-static space-y-5">
          <div className="space-y-2">
            <p className="eyebrow">{whiteLabelKit.eyebrow}</p>
            <h2 id="white-label-heading" className="feature-title text-2xl">
              {whiteLabelKit.title}
            </h2>
            <p className="body-copy max-w-2xl">{whiteLabelKit.description}</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {whiteLabelKit.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link href={whiteLabelKit.ctaPath} className="btn-outline w-fit">
            Premium for a client app
          </Link>
        </section>

        <section aria-labelledby="use-cases-heading" className="space-y-6">
          <h2 id="use-cases-heading" className="feature-title text-2xl">
            Common client projects
          </h2>
          <ul className="grid gap-4 lg:grid-cols-3">
            {verticalPlaybooks.map((playbook) => (
              <li key={playbook.tag} className="card-product flex h-full flex-col gap-4">
                <span className="sticker w-fit text-xs">{playbook.tag}</span>
                <div className="space-y-2">
                  <p className="font-heading text-lg font-bold text-ink">{playbook.title}</p>
                  <p className="body-copy text-base text-ink-soft">{playbook.pitch}</p>
                </div>
                <ul className="mt-auto space-y-1.5 border-t border-line pt-4">
                  {playbook.hooks.map((hook) => (
                    <li key={hook} className="flex gap-2 text-sm text-ink-soft">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-orange" aria-hidden="true" />
                      {hook}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resources-heading" className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{pitchAssets.eyebrow}</p>
            <h2 id="resources-heading" className="feature-title text-2xl">
              {pitchAssets.title}
            </h2>
            <p className="body-copy max-w-2xl">{pitchAssets.description}</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {pitchAssets.assets.map((asset) => (
              <li key={asset.label} className="card-product space-y-2">
                <p className="font-heading text-lg font-bold text-ink">{asset.label}</p>
                <p className="body-copy text-sm text-ink-soft">{asset.description}</p>
                {asset.external ? (
                  <a
                    href={asset.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${asset.label} (opens in new tab)`}
                  >
                    Open
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <HashLink
                    href={asset.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:underline"
                  >
                    Open demo
                  </HashLink>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sow-boilerplate-heading" className="card-static space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">SOW template</p>
            <h2 id="sow-boilerplate-heading" className="feature-title text-xl">
              Language for client contracts
            </h2>
            <p className="body-copy text-sm text-ink-soft">
              Customize bracketed fields before including in a statement of work.
            </p>
          </div>
          <blockquote className="rounded-2xl border border-line bg-white/60 p-5 font-mono text-sm leading-relaxed text-ink-soft">
            {sowBoilerplate}
          </blockquote>
        </section>

        <section id="apply" className="scroll-mt-header grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="eyebrow">{partnerOnboarding.eyebrow}</p>
              <h2 className="feature-title text-2xl">{partnerOnboarding.title}</h2>
              <p className="body-copy">{partnerOnboarding.description}</p>
            </div>
            <ul className="space-y-2">
              {partnerOnboarding.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="body-copy text-sm text-ink-soft">
              Single client project?{" "}
              <HashLink href={STREAMQ_HOME_ANCHORS.pricing} className="font-bold text-orange hover:underline">
                Player from $49/mo
              </HashLink>{" "}
              may be a better fit.
            </p>
          </div>

          <LicenseRequestPanel plan="agency" billing="monthly" />
        </section>
      </div>
    </main>
    </>
  )
}
