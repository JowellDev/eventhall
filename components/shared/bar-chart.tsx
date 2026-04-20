interface BarChartItem {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartItem[]
  height?: number
  showTopLabel?: boolean
}

export function BarChart({ data, height = 140, showTopLabel = false }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex items-end gap-2" style={{ height: height + (showTopLabel ? 24 : 0) }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          {showTopLabel && (
            <span className="text-xs text-muted-foreground font-body">{d.value}</span>
          )}
          <div
            className="w-full rounded-t-lg transition-all hover:opacity-90"
            style={{
              height: `${(d.value / max) * height}px`,
              background: 'linear-gradient(to top, #b8922a, #d4af37, #f4c430)',
              boxShadow: '0 -4px 20px rgba(212,175,55,0.2)',
            }}
          />
          <span className="text-xs text-muted-foreground font-body">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
