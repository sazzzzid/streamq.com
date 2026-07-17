import { shiftDay, todayKey } from "@/lib/habit-tracker/date-utils"

export function computeStreak(completions: string[]): number {
  const set = new Set(completions)
  let cursor = todayKey()
  if (!set.has(cursor)) {
    cursor = shiftDay(cursor, -1)
  }
  let streak = 0
  while (set.has(cursor)) {
    streak += 1
    cursor = shiftDay(cursor, -1)
  }
  return streak
}

export function completionRate(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}
