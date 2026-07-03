import Link from "next/link"
import { Check } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
import { ComparisonTable } from "@/components/home/comparison-table"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { pricingTiers } from "@/lib/home-content"
import { drmPlaybackNote, licenseScopeNote } from "@/lib/pricing-guide"
import { getGetStartedPath } from "@/lib/pricing-checkout"
import { STREAMQ_NPM_URL, STREAMQ_DEMO_ANCHOR, STREAMQ_PARTNERS_PATH } from "@/lib/site-links"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="pricing" className="section-lg scroll-mt-24 bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Pricing"
            title="Simple license tiers"
            description="Evaluation is free. Player for one app. Studio for agencies. Premium for DRM playback and enterprise extensions."
          />
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier, index) => (
            <MotionReveal key={tier.name} delay={index * 0.05}>
              <article
                className={cn(
                  "flex h-full flex-col gap-5",
                  tier.highlighted ? "card ring-2 ring-orange" : "card-static",
                )}
              >
                {(tier.highlighted || tier.slug === "premium" || tier.slug === "agency") && (
                  <div className="flex flex-wrap gap-2">
                    {tier.highlighted ? (
                      <span className="sticker w-fit text-xs">Popular</span>
                    ) : null}
                    {tier.slug === "premium" ? (
                      <span className="sticker w-fit bg-purple text-xs text-white">DRM capable</span>
                    ) : null}
                    {tier.slug === "agency" ? (
                      <span className="sticker w-fit bg-blue text-xs text-white">For agencies</span>
                    ) : null}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="eyebrow">{tier.name}</p>
                  {tier.yearlyPrice ? (
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="feature-title text-4xl">
                        {tier.monthlyPrice}
                        <span className="text-lg font-bold text-ink-soft">/mo</span>
                      </p>
                      <p className="body-copy text-base text-ink-soft">
                        or {tier.yearlyPrice}/yr
                      </p>
                    </div>
                  ) : (
                    <p className="feature-title text-4xl">{tier.monthlyPrice}</p>
                  )}
                  <p className="text-sm font-bold text-orange">{tier.audience}</p>
                </div>

                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-ink-soft">
                      <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-2">
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
                      className={cn(
                        "btn-sm w-fit",
                        tier.highlighted ? "btn-primary" : "btn-outline",
                      )}
                    >
                      {tier.slug === "premium" ? "Get Premium" : "Get license"}
                    </Link>
                  )}

                  {tier.slug === "evaluation" || tier.slug === "player" ? (
                    <a
                      href={STREAMQ_NPM_URL}
                      className="text-sm font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Docs &amp; implementation →
                    </a>
                  ) : null}
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.1}>
          <div className="space-y-4 pt-2">
            <ComparisonTable />
            <p className="body-copy text-sm text-ink-soft">{drmPlaybackNote}</p>
            <p className="body-copy text-sm text-ink-soft">{licenseScopeNote}</p>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
