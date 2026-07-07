import type { TierBadge as TierBadgeData, TierBadgeTone } from "@/lib/home-content"
import { cn } from "@/lib/utils"

const toneClass: Record<TierBadgeTone, string> = {
  neutral: "tier-badge-neutral",
  pink: "tier-badge-pink",
  purple: "tier-badge-purple",
  green: "tier-badge-green",
  blue: "tier-badge-blue",
}

export function TierBadge({ label, tone }: TierBadgeData) {
  return <span className={cn("tier-badge", toneClass[tone])}>{label}</span>
}

export function TierBadgeRow({ badges }: { badges: readonly TierBadgeData[] }) {
  if (badges.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Plan highlights">
      {badges.map((badge) => (
        <TierBadge key={badge.label} {...badge} />
      ))}
    </div>
  )
}
