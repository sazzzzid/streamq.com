"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { isValidWhatsAppPhone } from "@/lib/habit-tracker/daily-report"
import { DEFAULT_SETTINGS, type TrackerSettings } from "@/lib/habit-tracker/settings"

interface SettingsPanelProps {
  settings: TrackerSettings
  onUpdate: (patch: Partial<TrackerSettings>) => void
  onReset: () => void
}

export function SettingsPanel({ settings, onUpdate, onReset }: SettingsPanelProps) {
  const [savedHint, setSavedHint] = useState<string | null>(null)
  const phoneIsValid = isValidWhatsAppPhone(settings.whatsappPhone)

  function commitNumber(field: "calorieTarget" | "proteinTargetG" | "codingHoursTarget", raw: string) {
    const num = Number(raw)
    if (!Number.isFinite(num)) return
    onUpdate({ [field]: num })
    setSavedHint("Settings saved")
    window.setTimeout(() => setSavedHint(null), 1500)
  }

  return (
    <div className="ht-settings-stack">
      <div className="ht-group-card ht-settings-card">
        <p className="ht-share-heading">Daily targets</p>
        <p className="ht-share-copy">Used for scoring, progress bars, and reports.</p>

        <label className="ht-settings-field">
          <span>Calories (kcal)</span>
          <input
            type="number"
            inputMode="numeric"
            min={800}
            max={5000}
            defaultValue={settings.calorieTarget}
            key={`cal-${settings.calorieTarget}`}
            onBlur={(event) => commitNumber("calorieTarget", event.target.value)}
            className="ht-input"
          />
        </label>

        <label className="ht-settings-field">
          <span>Protein (g)</span>
          <input
            type="number"
            inputMode="numeric"
            min={40}
            max={400}
            defaultValue={settings.proteinTargetG}
            key={`pro-${settings.proteinTargetG}`}
            onBlur={(event) => commitNumber("proteinTargetG", event.target.value)}
            className="ht-input"
          />
        </label>

        <label className="ht-settings-field">
          <span>Coding (hours)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={16}
            step={0.5}
            defaultValue={settings.codingHoursTarget}
            key={`code-${settings.codingHoursTarget}`}
            onBlur={(event) => commitNumber("codingHoursTarget", event.target.value)}
            className="ht-input"
          />
        </label>
      </div>

      <div className="ht-group-card ht-settings-card">
        <p className="ht-share-heading">WhatsApp</p>
        <label className="ht-settings-field" htmlFor="ht-settings-phone">
          <span>Your number (optional)</span>
          <input
            id="ht-settings-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={settings.whatsappPhone}
            onChange={(event) => onUpdate({ whatsappPhone: event.target.value })}
            className="ht-input"
          />
        </label>
        <p className="ht-share-hint">
          Used when sending daily or weekly reports. Include country code (+91…).
        </p>
        {!phoneIsValid ? (
          <p className="ht-share-status ht-share-status-warning">Invalid phone number format.</p>
        ) : null}
      </div>

      <div className="ht-settings-actions">
        <button type="button" className="ht-btn" onClick={onReset}>
          Reset to defaults
        </button>
        {savedHint ? <p className="ht-share-status">{savedHint}</p> : null}
        <p className="ht-share-hint">
          Defaults: {DEFAULT_SETTINGS.calorieTarget} kcal · {DEFAULT_SETTINGS.proteinTargetG}g ·{" "}
          {DEFAULT_SETTINGS.codingHoursTarget} hr coding
        </p>
      </div>
    </div>
  )
}

interface AppTabsProps {
  tab: "track" | "reports" | "settings"
  onChange: (tab: "track" | "reports" | "settings") => void
}

export function AppTabs({ tab, onChange }: AppTabsProps) {
  const tabs = [
    { id: "track" as const, label: "Track" },
    { id: "reports" as const, label: "Reports" },
    { id: "settings" as const, label: "Settings" },
  ]

  return (
    <div className="ht-app-tabs" role="tablist" aria-label="Tracker sections">
      {tabs.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={tab === item.id}
          className={cn("ht-app-tab", tab === item.id && "is-active")}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
