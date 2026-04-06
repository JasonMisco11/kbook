export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>Blog post content goes here.</p>
    </div>
  )
}
