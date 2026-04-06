interface StatsCardProps {
  title: string
  value: string | number
  description?: string
}

export default function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p className="stats-value">{value}</p>
      {description && <p className="stats-desc">{description}</p>}
    </div>
  )
}
