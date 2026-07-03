import type { StreamSourceType } from "@/lib/stream-source"

export const SOURCES = {
  hls_16_9_apple: {
    src: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
    type: "hls",
  },
  dash_16_9_angel: {
    src: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    type: "dash",
  },
  hls_16_9_angel: {
    src: "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8",
    type: "hls",
  },
  dash_16_9_bbb: {
    src: "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd",
    type: "dash",
  },
  hls_4_3: {
    src: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8",
    type: "hls",
  },
  dash_4_3: {
    src: "https://media.axprod.net/TestVectors/v8-MultiContent/Clear/Period02/Manifest.mpd",
    type: "dash",
  },
  dash_cinematic_sintel: {
    src: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
    type: "dash",
  },
  hls_cinematic_sintel: {
    src: "https://storage.googleapis.com/shaka-demo-assets/sintel-fmp4-aes/master.m3u8",
    type: "hls",
  },
  hls_cinematic_tos: {
    src: "https://storage.googleapis.com/shaka-demo-assets/tos/hls.m3u8",
    type: "hls",
  },
  dash_cinematic_tos: {
    src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/manifest.mpd",
    type: "dash",
  },
} as const satisfies Record<string, { src: string; type: StreamSourceType }>

export type SourceKey = keyof typeof SOURCES

export const DEFAULT_SOURCE_KEY: SourceKey = "hls_16_9_apple"

export const DEFAULT_SOURCE = SOURCES[DEFAULT_SOURCE_KEY]
