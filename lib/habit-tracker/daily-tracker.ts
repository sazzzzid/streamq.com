import { DEFAULT_TARGETS, type TrackerTargets } from "@/lib/habit-tracker/settings"

export type { TrackerTargets } from "@/lib/habit-tracker/settings"
export { DEFAULT_TARGETS } from "@/lib/habit-tracker/settings"

export const CALORIE_TARGET = DEFAULT_TARGETS.calorieTarget
export const PROTEIN_TARGET_G = DEFAULT_TARGETS.proteinTargetG
export const CODING_HOURS_TARGET = DEFAULT_TARGETS.codingHoursTarget
export const MIN_STUDY_NOTE_LENGTH = 10

export interface SupplementItem {
  id: string
  name: string
  short: string
}

export const SUPPLEMENTS: SupplementItem[] = [
  { id: "b12", name: "B12", short: "B12" },
  { id: "protein", name: "Protein", short: "Pro" },
  { id: "fish-oil", name: "Fish oil", short: "Oil" },
  { id: "d3", name: "D3", short: "D3" },
  { id: "zincovit", name: "Zincovit", short: "Zn" },
  { id: "creatine", name: "Creatine", short: "Cr" },
  { id: "magnesium", name: "Magnesium", short: "Mg" },
]

export const STORAGE_KEY = "streamq-daily-tracker"

export interface DayLog {
  supplements: string[]
  calories: number | null
  proteinG: number | null
  codingHours: number | null
  studyNotes: string
}

export interface ScoreItem {
  id: string
  label: string
  score: number
  weight: number
  detail: string
  accent: string
}

export interface DailyScore {
  total: number
  grade: string
  message: string
  items: ScoreItem[]
}

export function emptyDayLog(): DayLog {
  return {
    supplements: [],
    calories: null,
    proteinG: null,
    codingHours: null,
    studyNotes: "",
  }
}

export function normalizeDayLog(raw: Partial<DayLog> | undefined): DayLog {
  if (!raw) return emptyDayLog()

  return {
    supplements: Array.isArray(raw.supplements) ? raw.supplements : [],
    calories: typeof raw.calories === "number" ? raw.calories : null,
    proteinG: typeof raw.proteinG === "number" ? raw.proteinG : null,
    codingHours: typeof raw.codingHours === "number" ? raw.codingHours : null,
    studyNotes: typeof raw.studyNotes === "string" ? raw.studyNotes : "",
  }
}

export function migrateLegacyLog(raw: Record<string, unknown>): DayLog {
  const legacy = raw as Partial<DayLog>
  return normalizeDayLog(legacy)
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function calorieScore(calories: number | null, target: number): number {
  if (calories === null) return 0
  if (calories <= target) return clamp01(calories / target)
  const over = calories - target
  return clamp01(1 - over / 400)
}

function proteinScore(proteinG: number | null, target: number): number {
  if (proteinG === null) return 0
  return clamp01(proteinG / target)
}

function nutritionScore(log: DayLog, targets: TrackerTargets): number {
  const parts: number[] = []
  if (log.calories !== null) parts.push(calorieScore(log.calories, targets.calorieTarget))
  if (log.proteinG !== null) parts.push(proteinScore(log.proteinG, targets.proteinTargetG))
  if (parts.length === 0) return 0
  return parts.reduce((sum, part) => sum + part, 0) / parts.length
}

function studyScore(notes: string): number {
  const length = notes.trim().length
  if (length >= MIN_STUDY_NOTE_LENGTH) return 1
  if (length > 0) return 0.45
  return 0
}

export function gradeForScore(total: number): { grade: string; message: string } {
  if (total >= 90) return { grade: "Excellent", message: "Crushing it this week." }
  if (total >= 75) return { grade: "Strong", message: "Solid week — keep the rhythm." }
  if (total >= 50) return { grade: "On track", message: "Good progress this week." }
  if (total >= 25) return { grade: "Building", message: "Room to tighten a few habits." }
  return { grade: "Start", message: "Log more days to build momentum." }
}

function gradeForScoreDaily(total: number): { grade: string; message: string } {
  if (total >= 90) return { grade: "Excellent", message: "Crushing it today." }
  if (total >= 75) return { grade: "Strong", message: "Solid day — keep going." }
  if (total >= 50) return { grade: "On track", message: "Good progress so far." }
  if (total >= 25) return { grade: "Building", message: "A few wins left today." }
  return { grade: "Start", message: "Tap supplements and log your day." }
}

export function computeDailyScore(log: DayLog, targets: TrackerTargets = DEFAULT_TARGETS): DailyScore {
  const supplementScore =
    SUPPLEMENTS.length === 0 ? 0 : log.supplements.length / SUPPLEMENTS.length
  const nutrition = nutritionScore(log, targets)
  const coding =
    log.codingHours === null ? 0 : clamp01(log.codingHours / targets.codingHoursTarget)
  const study = studyScore(log.studyNotes)

  const items: ScoreItem[] = [
    {
      id: "supplements",
      label: "Supplements",
      score: Math.round(supplementScore * 100),
      weight: 30,
      detail: `${log.supplements.length}/${SUPPLEMENTS.length} taken`,
      accent: "#5e6ad2",
    },
    {
      id: "nutrition",
      label: "Nutrition",
      score: Math.round(nutrition * 100),
      weight: 40,
      detail: `${log.calories ?? "—"} kcal · ${log.proteinG ?? "—"}g protein`,
      accent: "#5e6ad2",
    },
    {
      id: "coding",
      label: "Coding",
      score: Math.round(coding * 100),
      weight: 20,
      detail: `${log.codingHours ?? "—"} / ${targets.codingHoursTarget} hr`,
      accent: "#5e6ad2",
    },
    {
      id: "study",
      label: "Study log",
      score: Math.round(study * 100),
      weight: 10,
      detail: log.studyNotes.trim() ? "Notes added" : "Add what you studied",
      accent: "#5e6ad2",
    },
  ]

  const weightedTotal = Math.round(
    supplementScore * 30 + nutrition * 40 + coding * 20 + study * 10,
  )

  const { grade, message } = gradeForScoreDaily(weightedTotal)

  return {
    total: weightedTotal,
    grade,
    message,
    items,
  }
}

export function progressPct(current: number | null, target: number): number {
  if (current === null || target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

export function getNextAction(
  log: DayLog,
  score: DailyScore,
  targets: TrackerTargets = DEFAULT_TARGETS,
): string {
  const weakest = [...score.items].sort((a, b) => a.score - b.score)[0]
  if (!weakest || score.total >= 90) return "You're in a great rhythm today."

  switch (weakest.id) {
    case "supplements":
      return `Take your supplements — ${log.supplements.length}/${SUPPLEMENTS.length} done.`
    case "nutrition":
      if (log.calories === null && log.proteinG === null) {
        return "Log calories and protein to move your score."
      }
      if (log.proteinG === null || (log.proteinG ?? 0) < targets.proteinTargetG) {
        return `Protein target is ${targets.proteinTargetG}g — log what you've eaten.`
      }
      return `Calorie target is ${targets.calorieTarget} kcal — update if you've eaten.`
    case "coding":
      return `Log coding hours — target is ${targets.codingHoursTarget} hr.`
    case "study":
      return "Write what you studied today for the final score boost."
    default:
      return score.message
  }
}
