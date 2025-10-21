import { Link } from 'react-router-dom'
import NewBadge from './NewBadge'
<<<<<<< HEAD
<<<<<<< HEAD
import type { Feature } from '../lib/types'
=======
import Tooltip from './Tooltip'
import type { Feature } from '../lib/types'
import { isFeatureNew } from '../lib/utils'
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
import Tooltip from './Tooltip'
import type { Feature } from '../lib/types'
import { isFeatureNew } from '../lib/utils'
>>>>>>> pr-local-swagger

interface Props {
  feature: Feature
}

export default function FeatureCard({ feature }: Props) {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> pr-local-swagger
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
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
}
