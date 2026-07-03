"use client"

import dynamic from "next/dynamic"
import type { StreamqPlayerEmbedProps } from "@/components/home/streamq-player-embed"
import { PlayerEmbedFallback } from "@/components/player/player-embed-fallback"

const loadStreamqPlayerEmbed = () =>
  import("@/components/home/streamq-player-embed").then((mod) => mod.StreamqPlayerEmbed)

const StreamqPlayerEmbed = dynamic(loadStreamqPlayerEmbed, {
  ssr: false,
  loading: () => <PlayerEmbedFallback />,
})

const StreamqPlayerEmbedPriority = dynamic(loadStreamqPlayerEmbed, {
  ssr: false,
  loading: () => <PlayerEmbedFallback priority />,
})

type LazyStreamqPlayerEmbedProps = StreamqPlayerEmbedProps & {
  posterPriority?: boolean
}

export function LazyStreamqPlayerEmbed({
  posterPriority = false,
  ...props
}: LazyStreamqPlayerEmbedProps) {
  const Player = posterPriority ? StreamqPlayerEmbedPriority : StreamqPlayerEmbed

  return <Player {...props} />
}
