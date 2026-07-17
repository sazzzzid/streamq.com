"use client"

import { useEffect, useId, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { shiftDay, todayKey } from "@/lib/habit-tracker/date-utils"
import {
  computeDailyScore,
  emptyDayLog,
  type DayLog,
  type TrackerTargets,
} from "@/lib/habit-tracker/daily-tracker"
import { formatDayHeading, formatDayShort, getRecentDayKeys, isFutureDate } from "@/lib/habit-tracker/day-utils"

interface DayNavigatorProps {
  selectedDate: string
  onSelectDate: (dateKey: string) => void
  log: Record<string, DayLog>
  targets: TrackerTargets
}

function dayHasData(log: Record<string, DayLog>, dateKey: string, targets: TrackerTargets): boolean {
  const day = log[dateKey]
  if (!day) return false
  return computeDailyScore(day, targets).total > 0
}

export function DayNavigator({ selectedDate, onSelectDate, log, targets }: DayNavigatorProps) {
  const today = todayKey()
  const labelId = useId()
  const stripRef = useRef<HTMLDivElement>(null)
  const isToday = selectedDate === today
  const canGoNext = selectedDate < today
  const stripKeys = getRecentDayKeys()

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const selected = strip.querySelector<HTMLButtonElement>(".ht-day-strip-item.is-selected")
    selected?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [selectedDate])

  return (
    <div className="ht-day-nav">
      <div className="ht-day-nav-head">
        <button type="button" className="ht-day-nav-btn" onClick={() => onSelectDate(shiftDay(selectedDate, -1))} aria-label="Previous day">
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <div className="ht-day-nav-copy">
          <p id={labelId} className="ht-day-nav-label">
            {isToday ? "Today" : "Selected day"}
          </p>
          <p className="ht-day-nav-date">{formatDayHeading(selectedDate)}</p>
        </div>
        <button
          type="button"
          className="ht-day-nav-btn"
          onClick={() => canGoNext && onSelectDate(shiftDay(selectedDate, 1))}
          disabled={!canGoNext}
          aria-label="Next day"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div ref={stripRef} className="ht-day-strip" role="group" aria-labelledby={labelId}>
        {stripKeys.map((dateKey) => {
          const day = log[dateKey] ?? emptyDayLog()
          const score = computeDailyScore(day, targets).total
          const logged = dayHasData(log, dateKey, targets)
          const disabled = isFutureDate(dateKey, today)

          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(dateKey)}
              className={cn(
                "ht-day-strip-item",
                selectedDate === dateKey && "is-selected",
                dateKey === today && "is-today",
                logged && "has-data",
              )}
              aria-pressed={selectedDate === dateKey}
            >
              <span>{formatDayShort(dateKey)}</span>
              <strong>{logged ? score : "—"}</strong>
            </button>
          )
        })}
      </div>

      {!isToday ? (
        <button type="button" className="ht-btn ht-btn-ghost" onClick={() => onSelectDate(today)}>
          Back to today
        </button>
      ) : null}
    </div>
  )
}
