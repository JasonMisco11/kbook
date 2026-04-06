// Reusable Badge component
interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{label}</span>
}
