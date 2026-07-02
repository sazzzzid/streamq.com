export default function Loading() {
  return (
    <div
      className="section flex min-h-[50vh] flex-1 items-center justify-center bg-paper"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="space-y-4 text-center">
        <div
          className="mx-auto size-14 animate-pulse rounded-full bg-orange/25 ring-2 ring-orange/40"
          aria-hidden="true"
        />
        <p className="eyebrow">Loading StreamQ</p>
      </div>
    </div>
  )
}
