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
} as const

export type SourceKey = keyof typeof SOURCES

export interface SourcePreset {
  key: SourceKey
  label: string
  aspect: "16:9" | "4:3" | "Cinematic"
  source: (typeof SOURCES)[SourceKey]
}

export const SOURCE_PRESETS: readonly SourcePreset[] = [
  {
    key: "hls_16_9_apple",
    label: "Apple BipBop",
    aspect: "16:9",
    source: SOURCES.hls_16_9_apple,
  },
  {
    key: "dash_16_9_angel",
    label: "Angel One",
    aspect: "16:9",
    source: SOURCES.dash_16_9_angel,
  },
  {
    key: "hls_16_9_angel",
    label: "Angel One HLS",
    aspect: "16:9",
    source: SOURCES.hls_16_9_angel,
  },
  {
    key: "dash_16_9_bbb",
    label: "Big Buck Bunny",
    aspect: "16:9",
    source: SOURCES.dash_16_9_bbb,
  },
  {
    key: "hls_4_3",
    label: "Apple BipBop 4:3",
    aspect: "4:3",
    source: SOURCES.hls_4_3,
  },
  {
    key: "dash_4_3",
    label: "Axinom 4:3",
    aspect: "4:3",
    source: SOURCES.dash_4_3,
  },
  {
    key: "dash_cinematic_sintel",
    label: "Sintel DASH",
    aspect: "Cinematic",
    source: SOURCES.dash_cinematic_sintel,
  },
  {
    key: "hls_cinematic_sintel",
    label: "Sintel HLS",
    aspect: "Cinematic",
    source: SOURCES.hls_cinematic_sintel,
  },
  {
    key: "hls_cinematic_tos",
    label: "Tears of Steel HLS",
    aspect: "Cinematic",
    source: SOURCES.hls_cinematic_tos,
  },
  {
    key: "dash_cinematic_tos",
    label: "Tears of Steel DASH",
    aspect: "Cinematic",
    source: SOURCES.dash_cinematic_tos,
  },
] as const

export function getPresetsByType(type: StreamSourceType): readonly SourcePreset[] {
  return SOURCE_PRESETS.filter((preset) => preset.source.type === type)
}

export const DEFAULT_SOURCE_KEY: SourceKey = "dash_cinematic_tos"

export const DEFAULT_SOURCE = SOURCES[DEFAULT_SOURCE_KEY]
