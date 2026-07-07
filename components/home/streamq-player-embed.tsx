"use client"

import "@streamq/player/baseline.css"
import { StreamqPlayer } from "@streamq/player"
import { POSTER_URL, STREAMQ_DEMO_LICENSE } from "@/lib/streamq-player-poster"
import type { StreamSource } from "@/lib/stream-source"

export interface StreamqPlayerEmbedProps {
  source: StreamSource
}

export function StreamqPlayerEmbed({ source }: StreamqPlayerEmbedProps) {
  return (
    <StreamqPlayer
      fillViewport
      license={STREAMQ_DEMO_LICENSE}
      layout="default"
      radius="none"
      source={source}
      videoFit="contain"
      renderSubtitles
      mobile={{
        autoFullscreenOnLandscape: true,
        resumePlaybackOnVisible: true,
      }}
      videoProps={{
        crossOrigin: 'anonymous',
        muted: true,
        playsInline: true,
        poster: POSTER_URL,
        preload: 'metadata',
      }}
    />
  )
}
