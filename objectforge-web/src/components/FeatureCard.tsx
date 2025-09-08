import { Link } from 'react-router-dom'
import NewBadge from './NewBadge'
import type { Feature } from '../lib/types'

interface Props {
  feature: Feature
}

export default function FeatureCard({ feature }: Props) {
  return (
    <Link
      to={`/features/${feature.slug}`}
      className="block relative p-4 rounded shadow-card bg-bg-3 hover:bg-bg-4 transition-colors"
    >
      <div className="absolute top-2 right-2">
        <NewBadge show={feature.isNew} />
      </div>
      <h3 className="font-semibold mb-1">{feature.title}</h3>
      <p className="text-sm text-fg-2">{feature.description}</p>
    </Link>
  )
}
