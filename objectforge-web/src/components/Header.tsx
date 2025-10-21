<<<<<<< HEAD
<<<<<<< HEAD
import { useTranslation } from 'react-i18next'
import * as Tooltip from '@radix-ui/react-tooltip'
import useHeaderReveal from '../hooks/useHeaderReveal'
import NewBadge from './NewBadge'
import { useUIStore } from '../store/ui'

export default function Header() {
  const hidden = useHeaderReveal()
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const { t, i18n } = useTranslation()

  const changeLang = () => {
    const next = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(next)
  }

  const navItems = [
    { key: 'home' },
    { key: 'features', isNew: true },
    { key: 'plaza', soon: true },
    { key: 'reviews' },
    { key: 'pricing' }
  ] as const

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bg-1 shadow-card transition-transform ${
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
          {navItems.map((n) => (
            <Tooltip.Root key={n.key} delayDuration={200}>
              <Tooltip.Trigger asChild>
                <a
                  href="#"
                  className={`relative flex items-center ${
                    n.soon ? 'text-gray-400 pointer-events-none' : ''
                  }`}
                >
                  {t(`nav.${n.key}`)}
                  <span className="absolute -top-2 -right-3">
                    <NewBadge show={Boolean(n.isNew)} />
                  </span>
                </a>
              </Tooltip.Trigger>
              {n.soon && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="bottom"
                    className="bg-fg-1 text-fg-white text-xs px-2 py-1 rounded"
                  >
                    Coming Soon
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={changeLang}>{i18n.language === 'en' ? 'EN' : '中文'}</button>
          <button>{t('buttons.login')}</button>
          <button>{t('buttons.register')}</button>
          <div style={{ display: 'none' }} />
          <div style={{ display: 'none' }} />
=======
=======
>>>>>>> pr-local-swagger
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
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
        </div>
      </div>
    </header>
  )
}
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
