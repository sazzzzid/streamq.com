export default function GetStartedLoading() {
  return (
    <main id="main" className="section-lg bg-paper" aria-busy="true" aria-live="polite">
      <div className="container-brand editorial-stack">
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-line" />
          <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-line" />
          <div className="h-20 w-full max-w-2xl animate-pulse rounded-2xl bg-line" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="h-40 animate-pulse rounded-[var(--radius-card)] bg-line" />
            <div className="h-32 animate-pulse rounded-[var(--radius-card)] bg-line" />
          </div>
          <div className="h-72 animate-pulse rounded-[var(--radius-card)] bg-line" />
        </div>
        <span className="sr-only">Loading get started page…</span>
      </div>
    </main>
  )
}
