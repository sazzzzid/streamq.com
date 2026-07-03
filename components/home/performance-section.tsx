import { BenchmarkTable } from "@/components/home/benchmark-table"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { performanceIntro, performanceStats } from "@/lib/home-content"

export function PerformanceSection() {
  return (
    <section id="performance">
      <div id="benchmarks" className="section-band scroll-mt-24 py-8 md:py-10">
        <div className="container-brand">
          <MotionReveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {performanceStats.map((stat) => (
                <li key={stat.label} className="card-product space-y-1">
                  <p className="feature-title text-3xl md:text-4xl">{stat.value}</p>
                  <p className="eyebrow">{stat.label}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{stat.detail}</p>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </div>

      <div className="section bg-paper">
        <div className="container-brand editorial-stack">
          <MotionReveal>
            <SectionIntro
              eyebrow={performanceIntro.eyebrow}
              title={performanceIntro.title}
              description={performanceIntro.description}
              sticker={performanceIntro.sticker}
            />
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <BenchmarkTable />
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
