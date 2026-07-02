"use client"

import { DEFAULT_SOURCE } from "@/lib/streamq-demo-sources"
import { StreamqPlayerEmbed } from "@/components/home/streamq-player-embed"

export function StreamqPlayerDemo() {
  return <StreamqPlayerEmbed source={DEFAULT_SOURCE} />
}
