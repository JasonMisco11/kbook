export default async function PlumberJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <h1>Job #{id}</h1>
      <p>Job details and status actions.</p>
    </div>
  )
}
