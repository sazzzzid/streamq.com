"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AVOID_LIST,
  DAILY_TARGETS,
  getMealsForDay,
  GYM_NOTES,
  WEIGHT_GOAL,
} from "@/lib/habit-tracker/diet-plan"
import { todayKey } from "@/lib/habit-tracker/date-utils"

const MEALS_STORAGE_KEY = "streamq-diet-meals"
const WEIGHT_STORAGE_KEY = "streamq-diet-weight"

interface WeightLog {
  date: string
  kg: number
}

function loadMealCompletions(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(MEALS_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, string[]>) : {}
  } catch {
    return {}
  }
}

function loadWeightLog(): WeightLog[] {
  try {
    const raw = localStorage.getItem(WEIGHT_STORAGE_KEY)
    if (!raw) return [{ date: todayKey(), kg: WEIGHT_GOAL.startKg }]
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return [{ date: todayKey(), kg: WEIGHT_GOAL.startKg }]
    return parsed.filter(
      (item): item is WeightLog =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as WeightLog).date === "string" &&
        typeof (item as WeightLog).kg === "number",
    )
  } catch {
    return [{ date: todayKey(), kg: WEIGHT_GOAL.startKg }]
  }
}

interface DietTrackerProps {
  onUpdate?: () => void
}

export function DietTracker({ onUpdate }: DietTrackerProps) {
  const [hydrated, setHydrated] = useState(false)
  const [mealLog, setMealLog] = useState<Record<string, string[]>>({})
  const [weightLog, setWeightLog] = useState<WeightLog[]>([])
  const [weightInput, setWeightInput] = useState("")
  const today = todayKey()
  const meals = useMemo(() => getMealsForDay(new Date()), [])

  useEffect(() => {
    setMealLog(loadMealCompletions())
    const weights = loadWeightLog()
    setWeightLog(weights)
    setWeightInput(String(weights[weights.length - 1]?.kg ?? WEIGHT_GOAL.startKg))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(mealLog))
    onUpdate?.()
  }, [mealLog, hydrated, onUpdate])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(weightLog))
    onUpdate?.()
  }, [weightLog, hydrated, onUpdate])

  const completedMeals = useMemo(() => {
    const todayMeals = mealLog[today] ?? []
    return meals.filter((meal) => todayMeals.includes(meal.id)).length
  }, [mealLog, meals, today])

  const latestWeight = weightLog[weightLog.length - 1]?.kg ?? WEIGHT_GOAL.startKg
  const lostKg = Math.max(0, WEIGHT_GOAL.startKg - latestWeight)
  const remainingKg = Math.max(0, latestWeight - WEIGHT_GOAL.targetKg)
  const progressPct = Math.min(
    100,
    Math.round((lostKg / (WEIGHT_GOAL.startKg - WEIGHT_GOAL.targetKg)) * 100),
  )

  function toggleMeal(mealId: string) {
    setMealLog((prev) => {
      const todayMeals = prev[today] ?? []
      const next = todayMeals.includes(mealId)
        ? todayMeals.filter((id) => id !== mealId)
        : [...todayMeals, mealId]
      return { ...prev, [today]: next }
    })
  }

  function handleWeightSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const kg = Number(weightInput)
    if (!Number.isFinite(kg) || kg < 40 || kg > 200) return

    setWeightLog((prev) => {
      const last = prev[prev.length - 1]
      if (last?.date === today) {
        return [...prev.slice(0, -1), { date: today, kg }]
      }
      return [...prev, { date: today, kg }]
    })
  }

  if (!hydrated) {
    return (
      <div className="ht-group-card">
        <p className="ht-loading">Loading plan…</p>
      </div>
    )
  }

  return (
    <>
      <section className="ht-group" aria-label="Weight progress">
        <p className="ht-group-label">Goal · 92 kg → 75 kg</p>
        <div className="ht-group-card ht-weight-card">
          <div className="ht-weight-stats">
            <div>
              <p className="ht-weight-stat-label">Current</p>
              <p className="ht-weight-stat-value">{latestWeight.toFixed(1)} kg</p>
            </div>
            <div>
              <p className="ht-weight-stat-label">Lost</p>
              <p className="ht-weight-stat-value ht-weight-stat-green">{lostKg.toFixed(1)} kg</p>
            </div>
            <div>
              <p className="ht-weight-stat-label">To go</p>
              <p className="ht-weight-stat-value">{remainingKg.toFixed(1)} kg</p>
            </div>
          </div>
          <div className="ht-weight-bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="ht-weight-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <form onSubmit={handleWeightSave} className="ht-weight-form">
            <label className="ht-weight-field">
              <span className="sr-only">Today&apos;s weight in kg</span>
              <input
                type="number"
                step="0.1"
                min="40"
                max="200"
                value={weightInput}
                onChange={(event) => setWeightInput(event.target.value)}
                className="ht-input ht-weight-input"
                placeholder="Weight (kg)"
              />
            </label>
            <button type="submit" className="ht-btn ht-btn-secondary">
              Log
            </button>
          </form>
        </div>
      </section>

      <section className="ht-group" aria-label="Daily targets">
        <p className="ht-group-label">Daily Targets</p>
        <ul className="ht-group-card">
          <li className="ht-detail-cell">
            <span>Calories</span>
            <strong>{DAILY_TARGETS.calories}</strong>
          </li>
          <li className="ht-detail-cell">
            <span>Protein</span>
            <strong>{DAILY_TARGETS.proteinG} g</strong>
          </li>
          <li className="ht-detail-cell">
            <span>Water</span>
            <strong>{DAILY_TARGETS.waterL} L</strong>
          </li>
          <li className="ht-detail-cell">
            <span>Steps (WFH)</span>
            <strong>{DAILY_TARGETS.steps.toLocaleString()}+</strong>
          </li>
        </ul>
      </section>

      <section className="ht-group" aria-labelledby="meals-label">
        <p id="meals-label" className="ht-group-label">
          Today&apos;s Meals · {completedMeals}/{meals.length} done
        </p>
        <ul className="ht-group-card">
          {meals.map((meal) => {
            const done = (mealLog[today] ?? []).includes(meal.id)
            return (
              <li key={meal.id} className={cn("ht-meal-cell", done && "is-done")}>
                <button
                  type="button"
                  onClick={() => toggleMeal(meal.id)}
                  className="ht-check"
                  aria-pressed={done}
                  aria-label={done ? `Mark ${meal.title} incomplete` : `Mark ${meal.title} complete`}
                >
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </button>
                <div className="ht-cell-body">
                  <div className="ht-meal-head">
                    <p className="ht-item-name">{meal.title}</p>
                    <span className="ht-cal-pill">{meal.calories} cal</span>
                  </div>
                  <p className="ht-meal-time">{meal.time}</p>
                  <ul className="ht-meal-items">
                    {meal.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="ht-group" aria-labelledby="gym-label">
        <p id="gym-label" className="ht-group-label">
          Gym · 8–10 PM
        </p>
        <ul className="ht-group-card ht-notes-list">
          {GYM_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="ht-group" aria-labelledby="avoid-label">
        <p id="avoid-label" className="ht-group-label">
          Cut These
        </p>
        <ul className="ht-group-card ht-notes-list ht-notes-list-danger">
          {AVOID_LIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="ht-footnote">
          Target 0.75–1 kg/week. Log weight weekly, same time. Not medical advice — consult a
          doctor if you have health conditions.
        </p>
      </section>
    </>
  )
}
