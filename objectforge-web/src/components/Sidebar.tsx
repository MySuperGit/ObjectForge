<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Flame, ThumbsUp, List } from 'lucide-react'
import { useUIStore } from '../store/ui'
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const { sidebarOpen } = useUIStore()
  const { t } = useTranslation()
  const [filter, setFilter] = useState<'hot' | 'recommend' | 'all'>('hot')

  if (!sidebarOpen) return null

  const icons = { hot: Flame, recommend: ThumbsUp, all: List }

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
        {[1, 2, 3, 4, 5, 6].map((n) => {
          const Icon = icons[filter]
          return (
            <Tooltip.Root key={n} delayDuration={200}>
              <Tooltip.Trigger asChild>
                <button className="w-14 h-14 rounded-full bg-bg-white shadow-card flex items-center justify-center">
                  <Icon />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="right" className="bg-fg-1 text-fg-white text-xs px-2 py-1 rounded">
                  {t(`sidebar.${filter}`)} {n}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          )
        })}
=======
=======
>>>>>>> pr-local-swagger
import { Link, useLocation } from 'react-router-dom'
import { useFeatures } from '../lib/api'
import { useUI } from '../store/ui'
import NewBadge from './NewBadge'

function matchFilter(tags: string[] | undefined, tab: '热门' | '推荐' | '全部') {
  if (tab === '全部') return true
  if (!tags?.length) return false
  return tags.includes(tab)
}

export default function Sidebar() {
  const { data: features = [] } = useFeatures()
  const { sidebarCollapsed, setSidebarCollapsed, filterTab, setFilterTab } = useUI()
  const loc = useLocation()

  return (
    <aside className={`${sidebarCollapsed ? 'hidden md:block md:w-0' : 'block'} pt-2`}>
      <div className="sticky top-20">
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex rounded-xl border border-bg-9 overflow-hidden">
            {(['热门', '推荐', '全部'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 text-sm ${
                  filterTab === tab ? 'bg-brand text-fg-white' : 'bg-bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="px-2 py-1 border border-bg-9 rounded text-sm"
          >
            {sidebarCollapsed ? '⟶ 展开' : '⟵ 收起'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {features
            .filter((f) => matchFilter(f.tags, filterTab))
            .map((f) => {
              const disabled = f.availability === 'coming_soon'
              return (
                <Link
                  key={f.id}
                  to={disabled ? loc.pathname : `/features/${f.slug}`}
                  onClick={(e) => disabled && e.preventDefault()}
                  title={disabled ? `敬请期待：${f.releaseAt || ''}` : f.title}
                  className={`relative w-14 h-14 rounded-full border border-bg-9 flex items-center justify-center ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bg-9'
                  }`}
                >
                  <NewBadge isNew={f.isNew} until={f.newBadgeUntil} />
                  <span className="text-[11px] text-center leading-tight px-1">{f.title}</span>
                </Link>
              )
            })}
        </div>
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
      </div>
    </aside>
  )
}
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
