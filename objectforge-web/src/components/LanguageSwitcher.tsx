import { useTranslation } from 'react-i18next'
import http from '../lib/http'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.language || 'en').startsWith('zh') ? 'zh' : 'en'

  const change = async (lng: 'en' | 'zh') => {
    localStorage.setItem('lang', lng)
    await i18n.changeLanguage(lng)
    try {
      const response = await http.get(`/i18n/${lng}.json`, {
        headers: { 'Cache-Control': 'no-store', 'X-Skip-Toast': '1' },
      })
      i18n.addResources(lng, 'translation', response.data)
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

