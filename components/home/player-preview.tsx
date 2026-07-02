import { StreamqPlayerDemo } from "@/components/home/streamq-player-demo"

export function PlayerPreview() {
  return (
    <div className="card-shell" aria-label="@streamq/player preview">
      <div className="player-preview-header">
        <p className="font-mono text-sm font-bold text-ink">@streamq/player</p>
        <span className="sticker text-xs">Live demo</span>
      </div>

      <div className="player-embed aspect-video">
        <div className="player-embed-root">
          <StreamqPlayerDemo />
        </div>
      </div>
    </div>
  )
}
