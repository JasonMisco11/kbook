interface JobRowProps {
  id: string
  customerName: string
  service: string
  status: string
  date: string
}

export default function JobRow({ id, customerName, service, status, date }: JobRowProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{customerName}</td>
      <td>{service}</td>
      <td>{status}</td>
      <td>{date}</td>
    </tr>
  )
}
