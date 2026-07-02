import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { SEO_FAQS } from "@/lib/seo"

export function FaqSection() {
  return (
    <section id="faq" className="section-lg bg-paper">
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
              <details className="card-static group p-6">
                <summary className="cursor-pointer list-none font-heading text-lg font-bold text-ink marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span
                      className="text-orange transition group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="body-copy mt-4 text-base text-ink-soft">{item.answer}</p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
