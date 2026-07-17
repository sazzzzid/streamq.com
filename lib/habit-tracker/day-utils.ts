import { shiftDay, todayKey } from "@/lib/habit-tracker/date-utils"
import {
  computeDailyScore,
  type DayLog,
  type TrackerTargets,
} from "@/lib/habit-tracker/daily-tracker"
import { computeStreak } from "@/lib/habit-tracker/streak-utils"

const STREAK_SCORE_THRESHOLD = 50

export function isDayComplete(log: DayLog, targets: TrackerTargets): boolean {
  return computeDailyScore(log, targets).total >= STREAK_SCORE_THRESHOLD
}

export function getCompletedDayKeys(log: Record<string, DayLog>, targets: TrackerTargets): string[] {
  return Object.entries(log)
    .filter(([, day]) => isDayComplete(day, targets))
    .map(([dateKey]) => dateKey)
}

export function getCurrentStreak(log: Record<string, DayLog>, targets: TrackerTargets): number {
  return computeStreak(getCompletedDayKeys(log, targets))
}

export function getRecentDayKeys(endDate = new Date()): string[] {
  const end = todayKey(endDate)
  return Array.from({ length: 7 }, (_, index) => shiftDay(end, index - 6))
}

export function formatDayHeading(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function formatDayShort(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function isFutureDate(dateKey: string, today = todayKey()): boolean {
  return dateKey > today
}
