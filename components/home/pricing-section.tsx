import { ComparisonTable } from "@/components/home/comparison-table"
import { MotionReveal } from "@/components/home/motion-reveal"
import { PricingTierCard } from "@/components/home/pricing-tier-card"
import { SectionIntro } from "@/components/home/section-intro"
import { pricingTiers } from "@/lib/home-content"
import { drmPlaybackNote, licenseScopeNote } from "@/lib/pricing-guide"

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
            <MotionReveal key={tier.slug} delay={index * 0.05}>
              <PricingTierCard tier={tier} />
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
