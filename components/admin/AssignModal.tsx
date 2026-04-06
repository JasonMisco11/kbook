'use client'

interface AssignModalProps {
  jobId: string
  isOpen: boolean
  onClose: () => void
}

export default function AssignModal({ jobId, isOpen, onClose }: AssignModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Assign Plumber to Job #{jobId}</h2>
        {/* TODO: Plumber selection dropdown */}
        <p>Select a plumber to assign to this job.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
