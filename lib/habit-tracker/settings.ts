export const SETTINGS_STORAGE_KEY = "streamq-daily-tracker-settings"

export interface TrackerSettings {
  calorieTarget: number
  proteinTargetG: number
  codingHoursTarget: number
  whatsappPhone: string
}

export interface TrackerTargets {
  calorieTarget: number
  proteinTargetG: number
  codingHoursTarget: number
}

export const DEFAULT_SETTINGS: TrackerSettings = {
  calorieTarget: 1700,
  proteinTargetG: 150,
  codingHoursTarget: 3,
  whatsappPhone: "",
}

export const DEFAULT_TARGETS: TrackerTargets = {
  calorieTarget: DEFAULT_SETTINGS.calorieTarget,
  proteinTargetG: DEFAULT_SETTINGS.proteinTargetG,
  codingHoursTarget: DEFAULT_SETTINGS.codingHoursTarget,
}

export function targetsFromSettings(settings: TrackerSettings): TrackerTargets {
  return {
    calorieTarget: settings.calorieTarget,
    proteinTargetG: settings.proteinTargetG,
    codingHoursTarget: settings.codingHoursTarget,
  }
}

function clampTarget(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback
  return Math.min(max, Math.max(min, Math.round(value)))
}

export function normalizeSettings(raw: Partial<TrackerSettings> | undefined): TrackerSettings {
  if (!raw) return { ...DEFAULT_SETTINGS }

  return {
    calorieTarget: clampTarget(raw.calorieTarget, DEFAULT_SETTINGS.calorieTarget, 800, 5000),
    proteinTargetG: clampTarget(raw.proteinTargetG, DEFAULT_SETTINGS.proteinTargetG, 40, 400),
    codingHoursTarget: clampTarget(raw.codingHoursTarget, DEFAULT_SETTINGS.codingHoursTarget, 0, 16),
    whatsappPhone: typeof raw.whatsappPhone === "string" ? raw.whatsappPhone : "",
  }
}

export function loadSettings(): TrackerSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    const settings = raw
      ? normalizeSettings(JSON.parse(raw) as Partial<TrackerSettings>)
      : { ...DEFAULT_SETTINGS }

    if (!settings.whatsappPhone && typeof window !== "undefined") {
      const legacyPhone = localStorage.getItem("streamq-daily-tracker-whatsapp")
      if (legacyPhone) settings.whatsappPhone = legacyPhone
    }

    return settings
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: TrackerSettings): boolean {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalizeSettings(settings)))
    return true
  } catch {
    return false
  }
}
