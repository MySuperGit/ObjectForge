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
        </div>
      </div>
    </header>
  )
}

