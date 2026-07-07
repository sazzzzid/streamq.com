import { ExternalLink } from "lucide-react"
import { LazyCodeSnippet } from "@/components/home/lazy-code-snippet"
import { MotionReveal } from "@/components/home/motion-reveal"
import { NpmInstallCard } from "@/components/home/npm-install-card"
import { SectionIntro } from "@/components/home/section-intro"
import { playerExample } from "@/lib/home-content"
import { STREAMQ_DOCS_URL } from "@/lib/site-links"

export function ProductDemoSection() {
  return (
    <section id="install" className="section-lg scroll-mt-header bg-paper">
      <div className="container-brand editorial-stack">
        <MotionReveal>
          <SectionIntro
            eyebrow="Quick start"
            title="Install in under 5 minutes"
            description="npm install, add your sq_live_* key, point at your manifest."
            sticker="Under 5 min"
          />
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <NpmInstallCard />
        </MotionReveal>

        <div id="example" className="scroll-mt-header">
          <MotionReveal delay={0.08}>
            <LazyCodeSnippet code={playerExample} filename="App.tsx" />
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1}>
          <div id="docs" className="scroll-mt-header">
            <p className="body-copy text-sm text-ink-soft">
              Full API reference and HLS/DASH setup:{" "}
              <a
                href={`${STREAMQ_DOCS_URL}?activeTab=readme`}
                className="inline-flex items-center gap-1 font-bold text-orange hover:underline"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Open @streamq/player README on npm (opens in new tab)"
              >
                npm README
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
