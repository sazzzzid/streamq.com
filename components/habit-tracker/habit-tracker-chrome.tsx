"use client"

import { useEffect } from "react"

const ROUTE_CLASS = "habit-tracker-route"

/** Removes the route class when navigating away from /habit-tracker. */
export function HabitTrackerChrome() {
  useEffect(() => {
    document.documentElement.classList.add(ROUTE_CLASS)
    return () => {
      document.documentElement.classList.remove(ROUTE_CLASS)
    }
  }, [])

  return null
}
