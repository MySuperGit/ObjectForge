import { Link, useNavigate } from 'react-router-dom'
import { useHeaderReveal } from '../hooks/useHeaderReveal'
import { useFeatures } from '../lib/api'
import NewBadge from './NewBadge'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const visible = useHeaderReveal()
  const { data: features = [] } = useFeatures()
  const { t } = useTranslation()
  const nav = useNavigate()

  const groups = ['generate', 'edit', 'inspire', 'business'] as const
  const groupNames: Record<(typeof groups)[number], string> = {
    generate: 'Generate',
    edit: 'Edit',
    inspire: 'Inspire',
    business: 'Business'
  }

  const grouped = Object.fromEntries(
    groups.map((g) => [g, features.filter((f) => f.group === g)])
  )

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-bg-white/85 backdrop-blur border-b border-bg-9 transition duration-200 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      aria-label="Main header"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand"></div>
          <Link to="/" className="font-semibold text-fg-1">
            ObjectForge
          </Link>
          <button className="ml-2 px-2 py-1 rounded border border-bg-9 text-sm">☰</button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {groups.map((g) => (
            <div key={g} className="relative">
              <span className="text-sm font-semibold text-fg-2">
                {groupNames[g]}
              </span>
              <div className="mt-2 flex items-center gap-3">
                {grouped[g].slice(0, 4).map((item) => {
                  const coming = item.availability === 'coming_soon'
                  const tooltip = coming
                    ? `${t('status.comingSoon', { date: item.releaseAt || '' })}`
                    : ''
                  return (
                    <button
                      key={item.id}
                      onClick={() => !coming && nav(`/features/${item.slug}`)}
                      className={`relative px-3 py-1 rounded-xl border border-bg-9 text-sm ${
                        coming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bg-9'
                      }`}
                      title={tooltip}
                      aria-disabled={coming}
                    >
                      <NewBadge isNew={item.isNew} until={item.newBadgeUntil} />
                      <span>{item.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/login" className="btn-brand text-sm px-3 py-1">
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
