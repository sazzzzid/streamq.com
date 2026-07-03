import { performanceBenchmarks } from "@/lib/home-content"

export function BenchmarkTable() {
  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        <caption className="sr-only">
          Performance benchmarks — @streamq/player vs a typical DIY streaming stack
        </caption>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">@streamq/player</th>
            <th scope="col">Typical DIY stack</th>
          </tr>
        </thead>
        <tbody>
          {performanceBenchmarks.map((row) => (
            <tr key={row.metric}>
              <th scope="row">{row.metric}</th>
              <td className="font-bold text-ink">{row.streamq}</td>
              <td className="text-ink-soft">{row.alternative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
