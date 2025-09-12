import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.language || 'en').startsWith('zh') ? 'zh' : 'en'

  const change = async (lng: 'en' | 'zh') => {
    localStorage.setItem('lang', lng)
    await i18n.changeLanguage(lng)
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || '/api'
      const r = await fetch(`${API_BASE}/i18n/${lng}.json`, { cache: 'no-store' })
      if (r.ok) {
        const json = await r.json()
        i18n.addResources(lng, 'translation', json)
      }
    } catch {}
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <button
        className={`px-2 py-1 rounded ${current==='en'?'bg-brand text-fg-white':'bg-bg-white border border-bg-9'}`}
        onClick={() => change('en')}
        aria-pressed={current === 'en'}
      >EN</button>
      <button
        className={`px-2 py-1 rounded ${current==='zh'?'bg-brand text-fg-white':'bg-bg-white border border-bg-9'}`}
        onClick={() => change('zh')}
        aria-pressed={current === 'zh'}
      >中文</button>
    </div>
  )
}

