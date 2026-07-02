import { CodeSnippet } from "@/components/home/code-snippet"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { howItWorks, playerExample } from "@/lib/home-content"

export function ProductDemoSection() {
  return (
    <section id="demo" className="section-lg bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Newest release"
            title="Install in minutes"
            description="Same API as the live player above."
            sticker="Quick start"
          />
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <CodeSnippet code={playerExample} />
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <ol className="grid gap-4 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <li
                key={item.step}
                className={index === 1 ? "card-product tilt-right space-y-1" : "card-product space-y-1"}
              >
                <span className="sticker text-xs">{item.step}</span>
                <p className="font-heading text-lg font-bold text-ink">{item.title}</p>
                <p className="body-copy text-base">{item.detail}</p>
              </li>
            ))}
          </ol>
        </MotionReveal>
      </div>
    </section>
  )
}
