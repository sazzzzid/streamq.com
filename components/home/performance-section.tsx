import { Gauge, KeyRound, Layers, Package, ShieldCheck, Smartphone } from "lucide-react"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import {
  performanceHighlights,
  performanceIntro,
  performanceStats,
} from "@/lib/home-content"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const highlightIcons: Record<(typeof performanceHighlights)[number]["id"], LucideIcon> = {
  lazy: Gauge,
  single: Package,
  css: Layers,
  budgets: ShieldCheck,
  safari: Smartphone,
  license: KeyRound,
}

const accentBg = {
  orange: "bg-orange",
  blue: "bg-blue",
  green: "bg-green",
  yellow: "bg-yellow",
  purple: "bg-purple",
  pink: "bg-pink",
} as const

export function PerformanceSection() {
  return (
    <section id="performance">
      <div className="section-band py-8 md:py-10">
        <div className="container-brand">
          <MotionReveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {performanceStats.map((stat) => (
                <li key={stat.label} className="card-static space-y-1 p-5">
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {performanceHighlights.map((item, index) => {
              const Icon = highlightIcons[item.id]

              return (
                <MotionReveal key={item.id} delay={index * 0.03}>
                  <article
                    className={cn(
                      "card-product h-full space-y-3",
                      index % 3 === 1 && "tilt-left",
                      index % 3 === 2 && "tilt-right",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex size-11 items-center justify-center rounded-full text-white",
                          accentBg[item.accent],
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-lg font-bold text-ink">{item.title}</h3>
                    </div>
                    <p className="body-copy text-base">{item.summary}</p>
                  </article>
                </MotionReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
