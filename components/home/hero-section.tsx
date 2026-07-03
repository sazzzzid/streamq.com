import { ArrowRight } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
import { MotionReveal } from "@/components/home/motion-reveal"
import { PlayerPreview } from "@/components/home/player-preview"
import {
  heroKicker,
  heroPosterLine1,
  heroPosterLine2,
  heroSubtitle,
  heroWildLine,
} from "@/lib/home-content"
import { STREAMQ_DEMO_ANCHOR, STREAMQ_GET_STARTED_PATH } from "@/lib/site-links"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="blob absolute -left-32 top-10 bg-yellow/35" aria-hidden="true" />
      <div className="blob absolute right-0 top-1/3 bg-orange/20" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="container-brand editorial-grid relative z-10 items-center gap-12 lg:gap-20">
        <MotionReveal className="space-y-7">
          <span className="sticker">@streamq/player</span>

          <div className="space-y-3">
            <p className="poster-kicker">{heroKicker}</p>
            <h1 className="poster-title">
              <span className="block">{heroPosterLine1}</span>
              <span className="block text-orange">{heroPosterLine2}</span>
              <span className="sr-only">
                — StreamQ Player, React video SDK for HLS, DASH, and live streaming
              </span>
            </h1>
            <p className="poster-kicker text-orange">{heroWildLine}</p>
          </div>

          <p className="body-copy max-w-md">{heroSubtitle}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <HashLink href={STREAMQ_DEMO_ANCHOR} className="btn-primary">
              Live demo
              <ArrowRight className="size-5" aria-hidden="true" />
            </HashLink>
            <Link href={STREAMQ_GET_STARTED_PATH} className="btn-outline">
              Get license
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1} className="w-full">
          <div className="floating tilt-right">
            <PlayerPreview />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
