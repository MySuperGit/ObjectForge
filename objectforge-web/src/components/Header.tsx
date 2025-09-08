import { useTranslation } from 'react-i18next'
import useHeaderReveal from '../hooks/useHeaderReveal'
import NewBadge from './NewBadge'
import { useUIStore } from '../store/ui'
import LanguageSwitcher from './LanguageSwitcher'
import Tooltip from './Tooltip'

export default function Header() {
  useHeaderReveal()
  const hidden = useUIStore((s) => s.headerHidden)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const { t } = useTranslation()

  const navItems = [
    { key: 'home' },
    { key: 'features', isNew: true },
    { key: 'plaza', soon: true, releaseAt: '2026-01-10' },
    { key: 'reviews' },
    { key: 'pricing' }
  ] as const

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
          {navItems.map((n) => (
            <Tooltip key={n.key} content={n.soon ? `敬请期待 · 上线：${n.releaseAt}` : undefined}>
              <a
                href="#"
                className={`relative flex items-center ${
                  n.soon ? 'text-bg-6 pointer-events-none' : ''
                }`}
              >
                {t(`nav.${n.key}`)}
                <span className="absolute -top-2 -right-3">
                  <NewBadge show={Boolean(n.isNew)} />
                </span>
              </a>
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

