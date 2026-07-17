"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { todayKey } from "@/lib/habit-tracker/date-utils"
import { MOOD_OPTIONS } from "@/lib/habit-tracker/life-areas"

const MOOD_STORAGE_KEY = "streamq-life-mood"
const JOURNAL_STORAGE_KEY = "streamq-life-journal"

function loadMoodLog(): Record<string, number> {
  try {
    const raw = localStorage.getItem(MOOD_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, number>) : {}
  } catch {
    return {}
  }
}

function loadJournalLog(): Record<string, string> {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, string>) : {}
  } catch {
    return {}
  }
}

interface JournalPanelProps {
  onUpdate?: () => void
}

export function JournalPanel({ onUpdate }: JournalPanelProps) {
  const [hydrated, setHydrated] = useState(false)
  const [moodLog, setMoodLog] = useState<Record<string, number>>({})
  const [journalLog, setJournalLog] = useState<Record<string, string>>({})
  const today = todayKey()
  const mood = moodLog[today]
  const entry = journalLog[today] ?? ""

  useEffect(() => {
    setMoodLog(loadMoodLog())
    setJournalLog(loadJournalLog())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moodLog))
    onUpdate?.()
  }, [moodLog, hydrated, onUpdate])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journalLog))
    onUpdate?.()
  }, [journalLog, hydrated, onUpdate])

  function setMood(value: number) {
    setMoodLog((prev) => ({ ...prev, [today]: value }))
  }

  if (!hydrated) {
    return (
      <div className="ht-group-card">
        <p className="ht-loading">Loading…</p>
      </div>
    )
  }

  return (
    <>
      <section className="ht-group" aria-labelledby="mood-label">
        <p id="mood-label" className="ht-group-label">
          How are you feeling?
        </p>
        <div className="ht-group-card ht-mood-card">
          <div className="ht-mood-row" role="radiogroup" aria-label="Mood">
            {MOOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={mood === option.value}
                aria-label={option.label}
                className={cn("ht-mood-btn", mood === option.value && "is-active")}
                onClick={() => setMood(option.value)}
              >
                <span className="ht-mood-emoji" aria-hidden="true">
                  {option.emoji}
                </span>
                <span className="ht-mood-text">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ht-group" aria-labelledby="journal-label">
        <p id="journal-label" className="ht-group-label">
          Daily Reflection
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={entry}
            onChange={(event) =>
              setJournalLog((prev) => ({ ...prev, [today]: event.target.value }))
            }
            placeholder="What went well today? What will you improve tomorrow?"
            className="ht-journal-input"
            rows={6}
            maxLength={2000}
          />
          <p className="ht-journal-meta">{entry.length}/2000 · Saved automatically</p>
        </div>
      </section>

      <section className="ht-group" aria-label="Prompts">
        <p className="ht-group-label">Prompts</p>
        <ul className="ht-group-card ht-notes-list">
          <li>What am I grateful for today?</li>
          <li>Did I move my body and rest enough?</li>
          <li>What one thing matters most tomorrow?</li>
        </ul>
      </section>
    </>
  )
}
