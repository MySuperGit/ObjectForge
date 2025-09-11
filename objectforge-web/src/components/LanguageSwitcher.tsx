import { useTranslation } from 'react-i18next'
import { useUIStore } from '../store/ui'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const setLang = useUIStore((s) => s.setLang)

  const toggle = () => {
    const next = i18n.language.startsWith('en') ? 'zh' : 'en'
    i18n.changeLanguage(next)
    setLang(next)
  }

  return (
    <button onClick={toggle} aria-label="switch language" className="px-2">
      {i18n.language.startsWith('en') ? 'EN' : '中文'}
    </button>
  )
}
