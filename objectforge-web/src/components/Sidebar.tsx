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
      </div>
    </aside>
  )
}
