import { migrateLegacyLog, STORAGE_KEY, type DayLog } from "@/lib/habit-tracker/daily-tracker"

export type SaveStatus = "idle" | "saved" | "error"

export function loadTrackerLog(): { log: Record<string, DayLog>; error: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { log: {}, error: null }

    const parsed = JSON.parse(raw) as unknown
    if (typeof parsed !== "object" || parsed === null) {
      return { log: {}, error: "Saved data was invalid and has been reset." }
    }

    const entries = Object.entries(parsed as Record<string, unknown>)
    const log = Object.fromEntries(
      entries.map(([date, value]) => [
        date,
        migrateLegacyLog(typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {}),
      ]),
    )

    return { log, error: null }
  } catch {
    return { log: {}, error: "Could not read saved data. Starting fresh on this device." }
  }
}

export function saveTrackerLog(log: Record<string, DayLog>): SaveStatus {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log))
    return "saved"
  } catch {
    return "error"
  }
}
