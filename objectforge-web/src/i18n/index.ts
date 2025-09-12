import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import zh from './zh.json'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

// backend loader
async function loadRemote(lang: string) {
  try {
    const r = await fetch(`${API_BASE}/i18n/${lang}.json`, { cache: 'no-store' })
    if (!r.ok) throw new Error(String(r.status))
    return await r.json()
  } catch {
    return lang.startsWith('zh') ? zh : en
  }
}

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: { en: { translation: en }, zh: { translation: zh } },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

const lang = i18n.language || 'en'
const remote = await loadRemote(lang)
i18n.addResources(lang, 'translation', remote)

export default i18n

