interface ServiceCardProps {
  title: string
  description: string
  slug: string
}

export default function ServiceCard({ title, description, slug }: ServiceCardProps) {
  return (
    <a href={`/services/${slug}`}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  )
}
