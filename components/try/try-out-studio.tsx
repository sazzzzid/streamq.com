"use client"

import { useState, type FormEvent } from "react"
import { StreamqPlayerEmbed } from "@/components/home/streamq-player-embed"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DEFAULT_SOURCE,
  DEFAULT_SOURCE_KEY,
  getPresetsByType,
  type SourceKey,
} from "@/lib/streamq-demo-sources"
import {
  parseStreamSource,
  STREAM_SOURCE_TYPES,
  type StreamSource,
  type StreamSourceType,
} from "@/lib/stream-source"
import { cn } from "@/lib/utils"

export function TryOutStudio() {
  const [url, setUrl] = useState<string>(DEFAULT_SOURCE.src)
  const [type, setType] = useState<StreamSourceType>(DEFAULT_SOURCE.type)
  const [selectedPreset, setSelectedPreset] = useState<SourceKey | null>(DEFAULT_SOURCE_KEY)
  const [activeSource, setActiveSource] = useState<StreamSource>(DEFAULT_SOURCE)
  const [error, setError] = useState<string | null>(null)

  const presets = getPresetsByType(type)

  function loadSource(source: StreamSource, presetKey: SourceKey | null = null) {
    setUrl(source.src)
    setType(source.type)
    setSelectedPreset(presetKey)
    setError(null)
    setActiveSource(source)
  }

  function handleTypeChange(nextType: StreamSourceType) {
    const nextPresets = getPresetsByType(nextType)
    const firstPreset = nextPresets[0]

    if (firstPreset) {
      loadSource(firstPreset.source, firstPreset.key)
      return
    }

    setType(nextType)
    setUrl("")
    setSelectedPreset(null)
  }

  function handlePresetClick(presetKey: SourceKey) {
    const preset = getPresetsByType(type).find((item) => item.key === presetKey)

    if (!preset) {
      return
    }

    loadSource(preset.source, preset.key)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = parseStreamSource(url, type)

    if (!parsed) {
      setError("Enter a valid http(s) manifest URL.")
      return
    }

    loadSource(parsed, null)
  }

  return (
    <div className="editorial-stack">
      <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
        <div className="space-y-2">
          <span className="text-sm font-medium text-ink">Stream type</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Stream type">
            {STREAM_SOURCE_TYPES.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "pill-tag cursor-pointer",
                  type === option.value && "bg-orange text-white",
                )}
              >
                <input
                  type="radio"
                  name="stream-type"
                  value={option.value}
                  checked={type === option.value}
                  onChange={() => handleTypeChange(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-medium text-ink">Sample streams</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => handlePresetClick(preset.key)}
                className={cn(
                  "pill-tag cursor-pointer transition hover:-translate-y-0.5",
                  selectedPreset === preset.key && "bg-orange text-white",
                )}
              >
                {preset.label}
                <span className="ml-1 opacity-70">· {preset.aspect}</span>
              </button>
            ))}
          </div>
          <p className="body-copy text-sm text-ink-soft">
            Pick a public {type === "dash" ? ".mpd" : ".m3u8"} demo, or paste your own URL below.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stream-url">Manifest URL</Label>
          <Input
            id="stream-url"
            name="stream-url"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder={
              type === "dash"
                ? "https://example.com/stream.mpd"
                : "https://example.com/master.m3u8"
            }
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              setSelectedPreset(null)
            }}
            className="h-12 rounded-2xl px-4 text-base"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "stream-url-error" : "stream-url-hint"}
          />
          <p id="stream-url-hint" className="body-copy text-sm text-ink-soft">
            Custom URL must allow browser playback (CORS).
          </p>
          {error ? (
            <p id="stream-url-error" className="text-sm font-bold text-orange" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <button type="submit" className="btn-primary">
          Load stream
        </button>
      </form>

      <div className="card-shell">
        <div className="player-preview-header">
          <p className="font-mono text-sm font-bold text-ink">@streamq/player</p>
          <span className="sticker text-xs">Your stream</span>
        </div>

        <div className="player-embed aspect-video">
          <div className="player-embed-root">
            <StreamqPlayerEmbed
              key={`${activeSource.src}-${activeSource.type}`}
              source={activeSource}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
