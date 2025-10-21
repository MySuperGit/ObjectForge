import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
<<<<<<< HEAD
<<<<<<< HEAD
import en from './en.json'
import zh from './zh.json'

const resources = {
  en: { translation: en },
  zh: { translation: zh }
}

const defaultLng = 'en'
const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
const browser = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : defaultLng

i18n.use(initReactI18next).init({
  resources,
  lng: stored || defaultLng,
  fallbackLng: defaultLng,
  interpolation: { escapeValue: false }
})

if (!stored && browser !== defaultLng) {
  i18n.changeLanguage(browser)
  if (typeof window !== 'undefined') {
    alert(`Detected ${browser}, switched to ${browser}`)
  }
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lng)
  }
})
=======
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
=======
import LanguageDetector from 'i18next-browser-languagedetector'
import http from '../lib/http'
import en from './en.json'
import zh from './zh.json'

async function loadRemote(lang: string) {
  try {
    const response = await http.get(`/i18n/${lang}.json`, {
      headers: { 'Cache-Control': 'no-store', 'X-Skip-Toast': '1' },
    })
    return response.data
>>>>>>> pr-local-swagger
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
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v

export default i18n

=======

export default i18n
>>>>>>> pr-local-swagger
