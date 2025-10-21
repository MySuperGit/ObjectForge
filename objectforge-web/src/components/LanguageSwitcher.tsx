import { useTranslation } from 'react-i18next'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
import http from '../lib/http'
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.language || 'en').startsWith('zh') ? 'zh' : 'en'

  const change = async (lng: 'en' | 'zh') => {
    localStorage.setItem('lang', lng)
    await i18n.changeLanguage(lng)
    try {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> pr-ui-cors
      const API_BASE = import.meta.env.VITE_API_BASE || '/api'
      const r = await fetch(`${API_BASE}/i18n/${lng}.json`, { cache: 'no-store' })
      if (r.ok) {
        const json = await r.json()
        i18n.addResources(lng, 'translation', json)
      }
<<<<<<< HEAD
=======
      const response = await http.get(`/i18n/${lng}.json`, {
        headers: { 'Cache-Control': 'no-store', 'X-Skip-Toast': '1' },
      })
      i18n.addResources(lng, 'translation', response.data)
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
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

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
