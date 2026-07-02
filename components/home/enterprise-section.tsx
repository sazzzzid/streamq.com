import Link from "next/link"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { enterpriseHighlights, tier2Intro } from "@/lib/home-content"
import { cn } from "@/lib/utils"

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="section-lg">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Need more?"
            title="Enterprise extensions"
            description={tier2Intro}
            sticker="Premium"
          />
        </MotionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enterpriseHighlights.map((item, index) => (
            <MotionReveal key={item.name} delay={index * 0.04}>
              <article
                className={cn(
                  "card-product h-full space-y-2",
                  index % 2 === 0 ? "tilt-left" : "tilt-right",
                )}
              >
                <p className="font-heading text-lg font-bold text-ink">{item.name}</p>
                <p className="body-copy text-base">{item.detail}</p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal>
          <Link href="#pricing" className="btn-secondary w-fit">
            View Premium pricing
          </Link>
        </MotionReveal>
      </div>
    </section>
  )
}
