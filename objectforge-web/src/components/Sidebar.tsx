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
      </div>
    </aside>
  )
}

