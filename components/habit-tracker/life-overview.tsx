"use client"

import { useEffect, useMemo, useState } from "react"
import { ProgressRing } from "@/components/habit-tracker/progress-ring"
import { cn } from "@/lib/utils"
import { getMealsForDay } from "@/lib/habit-tracker/diet-plan"
import { todayKey } from "@/lib/habit-tracker/date-utils"
import { getLifeArea, LIFE_AREAS, type LifeAreaId } from "@/lib/habit-tracker/life-areas"
import { getTodayIntentions, intentionsLogged } from "@/lib/habit-tracker/life-change"
import { completionRate } from "@/lib/habit-tracker/streak-utils"

export interface LifeHabit {
  id: string
  name: string
  area: LifeAreaId
  createdAt: string
  completions: string[]
}

interface LifeOverviewProps {
  habits: LifeHabit[]
  mealCompleted: number
  mealTotal: number
  moodLogged: boolean
  journalLogged: boolean
  intentionsLogged: boolean
  onNavigate: (tab: "change" | "areas" | "health" | "journal") => void
}

const MEALS_STORAGE_KEY = "streamq-diet-meals"
const MOOD_STORAGE_KEY = "streamq-life-mood"
const JOURNAL_STORAGE_KEY = "streamq-life-journal"

export function loadMealProgress(today = todayKey()): { completed: number; total: number } {
  const meals = getMealsForDay(new Date())
  try {
    const raw = localStorage.getItem(MEALS_STORAGE_KEY)
    if (!raw) return { completed: 0, total: meals.length }
    const parsed = JSON.parse(raw) as Record<string, string[]>
    const done = (parsed[today] ?? []).length
    return { completed: done, total: meals.length }
  } catch {
    return { completed: 0, total: meals.length }
  }
}

export function loadMoodLogged(today = todayKey()): boolean {
  try {
    const raw = localStorage.getItem(MOOD_STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as Record<string, number>
    return typeof parsed[today] === "number"
  } catch {
    return false
  }
}

export function loadIntentionsLogged(today = todayKey()): boolean {
  return intentionsLogged(getTodayIntentions(today))
}

export function loadJournalLogged(today = todayKey()): boolean {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as Record<string, string>
    return Boolean(parsed[today]?.trim())
  } catch {
    return false
  }
}

export function LifeOverview({
  habits,
  mealCompleted,
  mealTotal,
  moodLogged,
  journalLogged,
  intentionsLogged: intentionsDone,
  onNavigate,
}: LifeOverviewProps) {
  const today = todayKey()

  const areaStats = useMemo(() => {
    return LIFE_AREAS.map((area) => {
      const areaHabits = habits.filter((habit) => habit.area === area.id)
      const done = areaHabits.filter((habit) => habit.completions.includes(today)).length
      return {
        ...area,
        done,
        total: areaHabits.length,
        pct: completionRate(done, areaHabits.length),
      }
    })
  }, [habits, today])

  const habitsDone = habits.filter((habit) => habit.completions.includes(today)).length
  const lifeCompleted =
    habitsDone +
    mealCompleted +
    (moodLogged ? 1 : 0) +
    (journalLogged ? 1 : 0) +
    (intentionsDone ? 1 : 0)
  const lifeTotal = habits.length + mealTotal + 3

  return (
    <>
      <section className="ht-group" aria-label="Life score">
        <div className="ht-group-card ht-life-hero">
          <ProgressRing
            value={lifeTotal === 0 ? 0 : Math.round((lifeCompleted / lifeTotal) * 100)}
            label="Life"
            gradientId="ht-life-ring"
          />
          <div className="ht-life-hero-copy">
            <p className="ht-life-score-label">Today&apos;s balance</p>
            <p className="ht-life-score-value">
              {lifeCompleted} of {lifeTotal} tracked
            </p>
            <p className="ht-life-score-sub">
              Small daily reps compound into a different life.
            </p>
          </div>
        </div>
      </section>

      <section className="ht-group" aria-label="Change your life">
        <button type="button" className="ht-change-banner" onClick={() => onNavigate("change")}>
          <span className="ht-change-banner-label">Your transformation</span>
          <span className="ht-change-banner-text">Vision · roadmap · 90-day goals →</span>
        </button>
      </section>

      <section className="ht-group" aria-label="Life areas">
        <p className="ht-group-label">Life Areas</p>
        <div className="ht-area-grid">
          {areaStats.map((area) => (
            <button
              key={area.id}
              type="button"
              className="ht-area-card"
              onClick={() => onNavigate("areas")}
              style={{ "--ht-area-accent": area.accent } as React.CSSProperties}
            >
              <div className="ht-area-head">
                <span className="ht-area-symbol" aria-hidden="true">
                  {area.symbol}
                </span>
                <span className="ht-area-label">{area.label}</span>
              </div>
              <p className="ht-area-stat">
                {area.total === 0 ? "—" : `${area.done}/${area.total}`}
              </p>
              <div className="ht-area-bar" aria-hidden="true">
                <div className="ht-area-bar-fill" style={{ width: `${area.pct}%` }} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="ht-group" aria-label="Quick status">
        <p className="ht-group-label">Quick Check</p>
        <ul className="ht-group-card">
          <li className="ht-detail-cell">
            <span>Meals</span>
            <button type="button" className="ht-link-btn" onClick={() => onNavigate("health")}>
              {mealCompleted}/{mealTotal} · Health →
            </button>
          </li>
          <li className="ht-detail-cell">
            <span>Mood</span>
            <button type="button" className="ht-link-btn" onClick={() => onNavigate("journal")}>
              {moodLogged ? "Logged" : "Not yet"} · Journal →
            </button>
          </li>
          <li className="ht-detail-cell">
            <span>Intention</span>
            <button type="button" className="ht-link-btn" onClick={() => onNavigate("change")}>
              {intentionsDone ? "Set" : "Empty"} · Today →
            </button>
          </li>
          <li className="ht-detail-cell">
            <span>Reflection</span>
            <button type="button" className="ht-link-btn" onClick={() => onNavigate("journal")}>
              {journalLogged ? "Written" : "Empty"} · Journal →
            </button>
          </li>
        </ul>
      </section>
    </>
  )
}

export function useLifeSignals(refreshKey: number) {
  const [signals, setSignals] = useState({
    mealCompleted: 0,
    mealTotal: 4,
    moodLogged: false,
    journalLogged: false,
    intentionsLogged: false,
  })

  useEffect(() => {
    const meals = loadMealProgress()
    setSignals({
      mealCompleted: meals.completed,
      mealTotal: meals.total,
      moodLogged: loadMoodLogged(),
      journalLogged: loadJournalLogged(),
      intentionsLogged: loadIntentionsLogged(),
    })
  }, [refreshKey])

  return signals
}

export function AreaBadge({ areaId }: { areaId: LifeAreaId }) {
  const area = getLifeArea(areaId)
  return (
    <span
      className="ht-area-badge"
      style={{ "--ht-area-accent": area.accent } as React.CSSProperties}
    >
      {area.label}
    </span>
  )
}

export function AreaPicker({
  value,
  onChange,
}: {
  value: LifeAreaId
  onChange: (area: LifeAreaId) => void
}) {
  return (
    <div className="ht-area-picker" role="radiogroup" aria-label="Life area">
      {LIFE_AREAS.map((area) => (
        <button
          key={area.id}
          type="button"
          role="radio"
          aria-checked={value === area.id}
          className={cn("ht-area-pill", value === area.id && "is-active")}
          style={{ "--ht-area-accent": area.accent } as React.CSSProperties}
          onClick={() => onChange(area.id)}
        >
          {area.label}
        </button>
      ))}
    </div>
  )
}
