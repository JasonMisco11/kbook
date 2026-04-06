export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <div>
      <h1>Service: {slug}</h1>
      <p>Details for this service.</p>
    </div>
  )
}
