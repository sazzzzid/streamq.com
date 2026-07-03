import Image from "next/image"
import { Play } from "lucide-react"
import { POSTER_URL } from "@/lib/streamq-player-poster"

interface PlayerEmbedFallbackProps {
  priority?: boolean
}

export function PlayerEmbedFallback({ priority = false }: PlayerEmbedFallbackProps) {
  return (
    <div
      className="relative size-full overflow-hidden bg-ink"
      aria-hidden="true"
      data-player-embed-fallback=""
    >
      <Image
        src={POSTER_URL}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-contain"
      />
      <div className="absolute inset-0 bg-ink/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-orange text-white shadow-poster ring-4 ring-white/20 transition-transform">
          <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
