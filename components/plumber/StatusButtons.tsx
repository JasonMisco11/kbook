'use client'

type JobStatus = 'en_route' | 'arrived' | 'in_progress' | 'completed'

interface StatusButtonsProps {
  currentStatus: JobStatus
  onStatusChange: (status: JobStatus) => void
}

const statusFlow: { status: JobStatus; label: string }[] = [
  { status: 'en_route', label: 'En Route' },
  { status: 'arrived', label: 'Arrived' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'completed', label: 'Completed' },
]

export default function StatusButtons({ currentStatus, onStatusChange }: StatusButtonsProps) {
  return (
    <div className="status-buttons">
      {statusFlow.map(({ status, label }) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          disabled={status === currentStatus}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
