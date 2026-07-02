export type StreamSourceType = "dash" | "hls"

export interface StreamSource {
  src: string
  type: StreamSourceType
}

export const STREAM_SOURCE_TYPES = [
  { value: "dash" as const, label: "DASH (.mpd)" },
  { value: "hls" as const, label: "HLS (.m3u8)" },
] as const

export function parseStreamSource(url: string, type: StreamSourceType): StreamSource | null {
  const trimmed = url.trim()

  if (!trimmed) {
    return null
  }

  try {
    const parsed = new URL(trimmed)

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null
    }

    return { src: trimmed, type }
  } catch {
    return null
  }
}
