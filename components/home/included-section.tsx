import {
  Accessibility,
  Clapperboard,
  KeyRound,
  Palette,
  Radio,
  Subtitles,
  Tv,
} from "lucide-react"
import { MotionReveal } from "@/components/home/motion-reveal"
import { SectionIntro } from "@/components/home/section-intro"
import { tier1Groups } from "@/lib/home-content"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const groupIcons: Record<(typeof tier1Groups)[number]["id"], LucideIcon> = {
  commercial: KeyRound,
  playback: Tv,
  live: Radio,
  subtitles: Subtitles,
  ux: Clapperboard,
  accessibility: Accessibility,
  integration: Palette,
}

const accentBg = {
  orange: "bg-orange",
  blue: "bg-blue",
  green: "bg-green",
  yellow: "bg-yellow",
  purple: "bg-purple",
  pink: "bg-pink",
} as const

export function IncludedSection() {
  return (
    <section id="included" className="section-lg scroll-mt-24 bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Super things included"
            title="What's in the box"
            description="Playback, UI, live mode, subtitles, and license control — one npm package, no extra installs."
            sticker="Tier 1"
          />
        </MotionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tier1Groups.map((group, index) => {
            const Icon = groupIcons[group.id]
            return (
              <MotionReveal key={group.id} delay={index * 0.03}>
                <article
                  id={group.id}
                  className={cn(
                    "card-product h-full space-y-4",
                    index % 3 === 1 && "tilt-left",
                    index % 3 === 2 && "tilt-right",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full text-white",
                        accentBg[group.accent],
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-ink">{group.title}</h3>
                  </div>
                  <p className="body-copy text-base">{group.summary}</p>
                </article>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
