import Link from "next/link"
import { Check } from "lucide-react"
import { ComparisonTable } from "@/components/home/comparison-table"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { pricingTiers } from "@/lib/home-content"
import { STREAMQ_CONTACT_MAILTO, STREAMQ_NPM_URL, STREAMQ_TRY_PATH } from "@/lib/site-links"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="pricing" className="section-lg bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Pricing"
            title="Simple license tiers"
            description="Start free with a demo key. Player from $49/mo. Premium from $499/mo with DRM and all extensions."
          />
        </MotionReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <MotionReveal key={tier.name} delay={index * 0.05}>
              <article
                className={cn(
                  "flex h-full flex-col gap-5",
                  tier.highlighted ? "card ring-2 ring-orange" : "card-static",
                )}
              >
                {tier.highlighted ? (
                  <span className="sticker w-fit text-xs">Popular</span>
                ) : null}
                {tier.name === "Premium" ? (
                  <span className="sticker w-fit bg-purple text-xs text-white">DRM-ready</span>
                ) : null}

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

                <div className="mt-auto flex flex-col gap-2">
                  {tier.name === "Evaluation" ? (
                    <Link href={STREAMQ_TRY_PATH} className="btn-outline w-fit text-sm">
                      Try it out
                    </Link>
                  ) : (
                    <a href={STREAMQ_CONTACT_MAILTO} className="btn-outline w-fit text-sm">
                      Contact sales
                    </a>
                  )}

                  {tier.name !== "Premium" ? (
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
          <div className="space-y-4">
            <h3 className="feature-title text-2xl">Player vs enterprise</h3>
            <ComparisonTable />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
