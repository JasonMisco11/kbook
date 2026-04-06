export default async function PlumberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <h1>Plumber Profile #{id}</h1>
      <p>Plumber details, performance, and job history.</p>
    </div>
  )
}
