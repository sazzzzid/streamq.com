import { LazyStreamqPlayerEmbed } from "@/components/player/lazy-streamq-player-embed"
import { DEFAULT_SOURCE } from "@/lib/streamq-demo-sources"

export function PlayerPreview() {
  return (
    <div className="player-shell card-shell scroll-mt-header" id="player" aria-label="@streamq/player preview">
      <div className="player-preview-header">
        <p className="font-mono text-sm font-bold text-ink">@streamq/player</p>
        <span className="sticker text-xs">Live demo</span>
      </div>

      <div className="player-embed aspect-video">
        <div className="player-embed-root">
          <LazyStreamqPlayerEmbed source={DEFAULT_SOURCE} posterPriority />
        </div>
      </div>
    </div>
  )
}
