"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  DEFAULT_SETTINGS,
  loadSettings,
  normalizeSettings,
  saveSettings,
  type TrackerSettings,
} from "@/lib/habit-tracker/settings"

const listeners = new Set<() => void>()
let snapshot: TrackerSettings = DEFAULT_SETTINGS
let initialized = false

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getClientSnapshot(): TrackerSettings {
  if (!initialized && typeof window !== "undefined") {
    snapshot = loadSettings()
    initialized = true
  }
  return snapshot
}

function getServerSnapshot(): TrackerSettings {
  return DEFAULT_SETTINGS
}

export function useTrackerSettings() {
  const settings = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  const updateSettings = useCallback((patch: Partial<TrackerSettings>) => {
    snapshot = normalizeSettings({ ...snapshot, ...patch })
    saveSettings(snapshot)
    emit()
  }, [])

  const resetSettings = useCallback(() => {
    snapshot = { ...DEFAULT_SETTINGS }
    saveSettings(snapshot)
    emit()
  }, [])

  return { settings, updateSettings, resetSettings }
}
