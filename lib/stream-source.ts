export type StreamSourceType = "dash" | "hls"

export interface StreamSource {
  src: string
  type: StreamSourceType
}
