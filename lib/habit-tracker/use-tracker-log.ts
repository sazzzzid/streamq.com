"use client"

import { useCallback, useSyncExternalStore } from "react"
import { type DayLog } from "@/lib/habit-tracker/daily-tracker"
import { loadTrackerLog, saveTrackerLog, type SaveStatus } from "@/lib/habit-tracker/storage"

type TrackerSnapshot = {
  log: Record<string, DayLog>
  loadError: string | null
  hydrated: boolean
  saveStatus: SaveStatus
}

const EMPTY: TrackerSnapshot = {
  log: {},
  loadError: null,
  hydrated: false,
  saveStatus: "idle",
}

let snapshot: TrackerSnapshot = EMPTY
const listeners = new Set<() => void>()
let saveTimer: number | undefined

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getClientSnapshot(): TrackerSnapshot {
  if (!snapshot.hydrated && typeof window !== "undefined") {
    const { log, error } = loadTrackerLog()
    snapshot = { log, loadError: error, hydrated: true, saveStatus: "idle" }
  }
  return snapshot
}

function getServerSnapshot(): TrackerSnapshot {
  return EMPTY
}

function persistLog(next: Record<string, DayLog>) {
  if (saveTimer) window.clearTimeout(saveTimer)

  const status = saveTrackerLog(next)
  snapshot = { ...snapshot, log: next, saveStatus: status }
  emit()

  if (status === "saved") {
    saveTimer = window.setTimeout(() => {
      snapshot = { ...snapshot, saveStatus: "idle" }
      emit()
    }, 1800)
  }
}

export function useTrackerLog() {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  const updateLog = useCallback((updater: (prev: Record<string, DayLog>) => Record<string, DayLog>) => {
    persistLog(updater(snapshot.log))
  }, [])

  return { ...state, updateLog }
}
