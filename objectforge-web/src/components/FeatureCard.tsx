import { Link } from 'react-router-dom'
import NewBadge from './NewBadge'
import Tooltip from './Tooltip'
import type { Feature } from '../lib/types'
import { isFeatureNew } from '../lib/utils'

interface Props {
  feature: Feature
}

export default function FeatureCard({ feature }: Props) {
  const comingSoon = feature.availability === 'coming_soon'
  const content = (
    <div
      className={`block relative p-4 rounded shadow-card bg-bg-3 transition-colors ${
        comingSoon ? 'text-bg-6 pointer-events-none' : 'hover:bg-bg-4'
      }`}
    >
      <NewBadge isNew={isFeatureNew(feature)} until={feature.newBadgeUntil} />
      <h3 className="font-semibold mb-1">{feature.title}</h3>
      {feature.description && <p className="text-sm text-fg-2">{feature.description}</p>}
    </div>
  )

  const body = comingSoon ? (
    <Tooltip content={`敬请期待 · 上线：${feature.releaseAt}`}>{content}</Tooltip>
  ) : (
    <Link to={`/features/${feature.slug}`}>{content}</Link>
  )
  return body
}
