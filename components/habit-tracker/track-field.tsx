"use client"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/utils"

interface TrackNumberFieldProps {
  label: string
  value: number | null
  unit: string
  target?: number
  hint?: string
  warning?: string
  onCommit: (value: number | null) => void
}

export function TrackNumberField({
  label,
  value,
  unit,
  target,
  hint,
  warning,
  onCommit,
}: TrackNumberFieldProps) {
  const id = useId()
  const [draft, setDraft] = useState("")
  const [focused, setFocused] = useState(false)
  const displayValue = focused ? draft : (value?.toString() ?? "")
  const progress =
    target && value !== null ? Math.min(100, Math.round((value / target) * 100)) : 0

  function commit(next: string) {
    const trimmed = next.trim()
    if (!trimmed) {
      onCommit(null)
      return
    }

    const num = Number(trimmed)
    if (!Number.isFinite(num) || num < 0) {
      setDraft(value?.toString() ?? "")
      return
    }

    onCommit(num)
  }

  return (
    <label className={cn("ht-input-row", warning && "has-warning")} htmlFor={id}>
      <div className="ht-input-label-col">
        <span>{label}</span>
        {target ? (
          <div
            className="ht-input-mini-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label} progress`}
          >
            <div className="ht-input-mini-fill" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
      </div>
      <div className="ht-input-col">
        <div className="ht-input-wrap">
          <input
            id={id}
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            value={displayValue}
            onFocus={() => {
              setDraft(value?.toString() ?? "")
              setFocused(true)
            }}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={() => {
              commit(draft)
              setFocused(false)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur()
              }
            }}
            placeholder="0"
            className="ht-track-input"
          />
          <span className="ht-input-unit">{unit}</span>
        </div>
        {warning ? <span className="ht-field-warning">{warning}</span> : null}
        {!warning && hint ? <span className="ht-field-hint">{hint}</span> : null}
      </div>
    </label>
  )
}

interface TrackNotesFieldProps {
  label: string
  value: string
  maxLength?: number
  minHintLength?: number
  placeholder?: string
  onChange: (value: string) => void
}

export function TrackNotesField({
  label,
  value,
  maxLength = 1000,
  minHintLength = 10,
  placeholder,
  onChange,
}: TrackNotesFieldProps) {
  const id = useId()
  const [draft, setDraft] = useState(value)
  const remaining = maxLength - draft.length
  const needsMore = draft.trim().length > 0 && draft.trim().length < minHintLength

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (draft !== value) onChange(draft)
    }, 500)
    return () => window.clearTimeout(timer)
  }, [draft, value, onChange])

  return (
    <label className="ht-input-stack" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        value={draft}
        onChange={(event) => setDraft(event.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        className="ht-journal-input"
        rows={4}
        maxLength={maxLength}
      />
      <div className="ht-notes-meta">
        {needsMore ? (
          <span className="ht-field-hint">{minHintLength - draft.trim().length} more chars for full study score</span>
        ) : (
          <span className="ht-field-hint">Saved automatically</span>
        )}
        <span className="ht-journal-meta">{remaining} left</span>
      </div>
    </label>
  )
}
