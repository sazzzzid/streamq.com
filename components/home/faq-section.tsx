import { MotionReveal } from "@/components/home/motion-reveal"
import { FaqItem } from "@/components/home/faq-item"
import { SectionIntro } from "@/components/home/section-intro"
import { SEO_FAQS } from "@/lib/seo"

export function FaqSection() {
  return (
    <section id="faq" className="section-lg scroll-mt-24 bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="FAQ"
            title="Video player SDK questions"
            description="How StreamQ compares to Mux, Bitmovin, JW Player, and building your own HLS/DASH stack."
            sticker="Answers"
          />
        </MotionReveal>

        <div className="space-y-4">
          {SEO_FAQS.map((item, index) => (
            <MotionReveal key={item.question} delay={index * 0.03}>
              <FaqItem question={item.question} answer={item.answer} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
