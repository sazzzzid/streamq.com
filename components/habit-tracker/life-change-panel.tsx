"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { todayKey } from "@/lib/habit-tracker/date-utils"
import {
  CHANGE_ROADMAP,
  CHANGE_RULES,
  DEFAULT_VISION,
  getTodayIntentions,
  loadDailyLog,
  loadVision,
  saveDailyLog,
  saveVision,
  type DailyIntentions,
  type LifeVision,
} from "@/lib/habit-tracker/life-change"

interface DailyIntentionsPanelProps {
  onUpdate?: () => void
}

export function DailyIntentionsPanel({ onUpdate }: DailyIntentionsPanelProps) {
  const [hydrated, setHydrated] = useState(false)
  const [dailyLog, setDailyLog] = useState<Record<string, DailyIntentions>>({})
  const [vision, setVision] = useState<LifeVision>(DEFAULT_VISION)
  const today = todayKey()
  const day = dailyLog[today] ?? { intention: "", eveningWin: "" }

  useEffect(() => {
    setDailyLog(loadDailyLog())
    setVision(loadVision())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveDailyLog(dailyLog)
    onUpdate?.()
  }, [dailyLog, hydrated, onUpdate])

  function updateDay(field: keyof DailyIntentions, value: string) {
    setDailyLog((prev) => ({
      ...prev,
      [today]: { ...(prev[today] ?? { intention: "", eveningWin: "" }), [field]: value },
    }))
  }

  if (!hydrated) return null

  return (
    <>
      {vision.northStar ? (
        <section className="ht-group" aria-label="North star">
          <div className="ht-group-card ht-north-star">
            <p className="ht-north-star-label">Who I&apos;m becoming</p>
            <p className="ht-north-star-text">&ldquo;{vision.northStar}&rdquo;</p>
          </div>
        </section>
      ) : null}

      {vision.weeklyFocus ? (
        <section className="ht-group" aria-label="Weekly focus">
          <p className="ht-group-label">This Week&apos;s Focus</p>
          <div className="ht-group-card ht-focus-card">
            <p className="ht-focus-text">{vision.weeklyFocus}</p>
          </div>
        </section>
      ) : null}

      <section className="ht-group" aria-labelledby="intention-label">
        <p id="intention-label" className="ht-group-label">
          Morning Intention
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={day.intention}
            onChange={(event) => updateDay("intention", event.target.value)}
            placeholder="What will make today a win? One sentence."
            className="ht-journal-input ht-journal-input-sm"
            rows={2}
            maxLength={280}
          />
        </div>
      </section>

      <section className="ht-group" aria-labelledby="win-label">
        <p id="win-label" className="ht-group-label">
          Tonight&apos;s Win
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={day.eveningWin}
            onChange={(event) => updateDay("eveningWin", event.target.value)}
            placeholder="After gym — what did you do right today?"
            className="ht-journal-input ht-journal-input-sm"
            rows={2}
            maxLength={280}
          />
        </div>
      </section>
    </>
  )
}

export function useDailyIntentions(refreshKey: number) {
  const [intentions, setIntentions] = useState<DailyIntentions>({
    intention: "",
    eveningWin: "",
  })
  const [visionSnippet, setVisionSnippet] = useState({ weeklyFocus: "", northStar: "" })

  useEffect(() => {
    const today = todayKey()
    setIntentions(getTodayIntentions(today))
    const vision = loadVision()
    setVisionSnippet({ weeklyFocus: vision.weeklyFocus, northStar: vision.northStar })
  }, [refreshKey])

  return { intentions, visionSnippet }
}

interface LifeChangePanelProps {
  onUpdate?: () => void
}

export function LifeChangePanel({ onUpdate }: LifeChangePanelProps) {
  const [hydrated, setHydrated] = useState(false)
  const [vision, setVision] = useState<LifeVision>(DEFAULT_VISION)

  useEffect(() => {
    setVision(loadVision())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveVision(vision)
    onUpdate?.()
  }, [vision, hydrated, onUpdate])

  function togglePhase(index: number) {
    setVision((prev) => {
      const phaseDone = [...prev.phaseDone]
      phaseDone[index] = !phaseDone[index]
      return { ...prev, phaseDone }
    })
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
      <section className="ht-group" aria-labelledby="north-star-edit">
        <p id="north-star-edit" className="ht-group-label">
          North Star · Who You&apos;re Becoming
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={vision.northStar}
            onChange={(event) => setVision((prev) => ({ ...prev, northStar: event.target.value }))}
            className="ht-journal-input"
            rows={3}
            maxLength={500}
            placeholder="Describe the person you're building..."
          />
        </div>
      </section>

      <section className="ht-group" aria-labelledby="why-label">
        <p id="why-label" className="ht-group-label">
          Why Now
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={vision.why}
            onChange={(event) => setVision((prev) => ({ ...prev, why: event.target.value }))}
            className="ht-journal-input"
            rows={3}
            maxLength={500}
            placeholder="Why is this time different?"
          />
        </div>
      </section>

      <section className="ht-group" aria-labelledby="weekly-focus-label">
        <p id="weekly-focus-label" className="ht-group-label">
          This Week&apos;s Focus
        </p>
        <div className="ht-group-card ht-journal-card">
          <textarea
            value={vision.weeklyFocus}
            onChange={(event) =>
              setVision((prev) => ({ ...prev, weeklyFocus: event.target.value }))
            }
            className="ht-journal-input ht-journal-input-sm"
            rows={2}
            maxLength={200}
            placeholder="One priority that moves everything forward"
          />
        </div>
      </section>

      <section className="ht-group" aria-labelledby="goals-label">
        <p id="goals-label" className="ht-group-label">
          90-Day Goals
        </p>
        <ul className="ht-group-card">
          {vision.goals90.map((goal, index) => (
            <li key={index} className="ht-goal-cell">
              <span className="ht-goal-num">{index + 1}</span>
              <input
                value={goal}
                onChange={(event) => {
                  const goals90 = [...vision.goals90]
                  goals90[index] = event.target.value
                  setVision((prev) => ({ ...prev, goals90 }))
                }}
                className="ht-goal-input"
                maxLength={120}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="ht-group" aria-label="Roadmap">
        <p className="ht-group-label">Your Roadmap · 92 → 75 kg</p>
        {CHANGE_ROADMAP.map((phase, index) => (
          <div key={phase.title} className="ht-group" style={{ marginBottom: "1rem" }}>
            <button
              type="button"
              className={cn("ht-phase-head", vision.phaseDone[index] && "is-done")}
              onClick={() => togglePhase(index)}
            >
              <span className={cn("ht-check ht-check-inline", vision.phaseDone[index] && "is-pressed")}>
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>
                <span className="ht-phase-title">{phase.title}</span>
                <span className="ht-phase-sub">{phase.subtitle}</span>
              </span>
            </button>
            <ul className="ht-group-card ht-notes-list">
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="ht-group" aria-label="Rules">
        <p className="ht-group-label">Non-Negotiables</p>
        <ul className="ht-group-card ht-notes-list ht-rules-list">
          {CHANGE_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="ht-footnote">
          Edit your vision anytime. Change happens through daily reps — not one perfect week.
        </p>
      </section>
    </>
  )
}
