interface JobCardProps {
  id: string
  customerName: string
  address: string
  service: string
  status: string
  scheduledTime: string
}

export default function JobCard({ id, customerName, address, service, status, scheduledTime }: JobCardProps) {
  return (
    <div className="job-card">
      <h3>Job #{id}</h3>
      <p><strong>Customer:</strong> {customerName}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Service:</strong> {service}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Time:</strong> {scheduledTime}</p>
    </div>
  )
}
