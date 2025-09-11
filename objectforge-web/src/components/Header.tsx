import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useHeaderReveal from '../hooks/useHeaderReveal'
import NewBadge from './NewBadge'
import { useUIStore } from '../store/ui'
import LanguageSwitcher from './LanguageSwitcher'
import Tooltip from './Tooltip'
import { isFeatureNew } from '../lib/utils'
import { useFeatures } from '../lib/api'

export default function Header() {
  useHeaderReveal()
  const hidden = useUIStore((s) => s.headerHidden)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const { t } = useTranslation()
  const { data: features = [] } = useFeatures()

  const baseNav = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.plaza'), to: '/plaza' },
    { label: t('nav.reviews'), to: '/reviews' },
    { label: t('nav.pricing'), to: '/pricing' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bg-white border-b border-bg-9 shadow-card transition-transform ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-fg-1" />
          <span className="font-bold">ObjectForge</span>
          <button className="ml-2" onClick={toggleSidebar} aria-label="sidebar toggle">
            ☰
          </button>
        </div>
        <nav className="flex gap-4">
          {baseNav.map((n) => (
            <Link key={n.to} to={n.to} className="relative flex items-center">
              {n.label}
              <span className="absolute -top-2 -right-3">
                <NewBadge show={false} />
              </span>
            </Link>
          ))}
          {features.map((f) => (
            <Tooltip
              key={f.id}
              content={
                f.availability === 'coming_soon'
                  ? `${t('status.comingSoon', { date: f.releaseAt })}`
                  : undefined
              }
            >
              {f.availability === 'coming_soon' ? (
                <span className="relative flex items-center text-bg-6 pointer-events-none">
                  {f.title}
                  <span className="absolute -top-2 -right-3">
                    <NewBadge show={isFeatureNew(f)} until={f.newBadgeUntil} />
                  </span>
                </span>
              ) : (
                <Link
                  to={`/features/${f.slug}`}
                  className="relative flex items-center"
                >
                  {f.title}
                  <span className="absolute -top-2 -right-3">
                    <NewBadge show={isFeatureNew(f)} until={f.newBadgeUntil} />
                  </span>
                </Link>
              )}
            </Tooltip>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button>{t('buttons.login')}</button>
          <button>{t('buttons.register')}</button>
          <div style={{ display: 'none' }} />
          <div style={{ display: 'none' }} />
        </div>
      </div>
    </header>
  )
}

