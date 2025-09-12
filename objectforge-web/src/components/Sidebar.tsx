import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Tooltip from '@radix-ui/react-tooltip'
import { List, Scissors, User, LucideIcon } from 'lucide-react'
import { useUIStore } from '../store/ui'
import { useTranslation } from 'react-i18next'
import NewBadge from './NewBadge'
import { useFeatures } from '../lib/api'
import { isFeatureNew } from '../lib/utils'

export default function Sidebar() {
  const { sidebarOpen } = useUIStore()
  const { t } = useTranslation()
  const [filter, setFilter] = useState<'hot' | 'recommend' | 'all'>('hot')
  const { data: features = [] } = useFeatures()

  if (!sidebarOpen) return null

  const iconMap: Record<string, LucideIcon> = {
    cut: Scissors,
    user: User
  }

  const filtered = features.filter((f) => {
    if (filter === 'hot') return f.tags?.includes('热门')
    if (filter === 'recommend') return f.tags?.includes('推荐')
    return true
  })

  return (
    <aside className="fixed top-20 left-4 z-40 flex flex-col gap-4">
      <div className="flex gap-2">
        {(['hot', 'recommend', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-1 rounded text-sm ${
              filter === f ? 'bg-brand text-fg-white' : 'bg-bg-5'
            }`}
          >
            {t(`sidebar.${f}`)}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {filtered.map((feat) => {
          const Icon = iconMap[feat.icon ?? ''] || List
          const comingSoon = feat.availability === 'coming_soon'
          const btn = (
            <div
              className={`relative w-14 h-14 rounded-full bg-bg-white shadow-card flex items-center justify-center ${
                comingSoon ? 'text-bg-6 pointer-events-none' : ''
              }`}
            >
              <Icon />
              <NewBadge isNew={isFeatureNew(feat)} until={feat.newBadgeUntil} />
            </div>
          )
          return (
            <Tooltip.Root key={feat.id} delayDuration={200}>
              <Tooltip.Trigger asChild>
                {comingSoon ? btn : <Link to={`/features/${feat.slug}`}>{btn}</Link>}
              </Tooltip.Trigger>
              {comingSoon && (
                <Tooltip.Content side="right" className="bg-fg-1 text-fg-white text-xs px-2 py-1 rounded">
                  {`${t('status.comingSoon', { date: feat.releaseAt })}`}
                </Tooltip.Content>
              )}
            </Tooltip.Root>
          )
        })}
      </div>
    </aside>
  )
}
