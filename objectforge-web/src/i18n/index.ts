import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import zh from './zh.json'
import { useUIStore } from '../store/ui'
import { showToast } from '../lib/toast'

const defaultLng = 'en'
const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
const browser =
  typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : defaultLng

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, zh: { translation: zh } },
  lng: stored || defaultLng,
  fallbackLng: defaultLng,
  interpolation: { escapeValue: false }
})

async function load(lng: string) {
  if (typeof fetch === 'undefined') return
  const key = `i18n-${lng}`
  const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
  let data
  if (cached) {
    data = JSON.parse(cached)
  } else {
    data = await fetch(`/api/i18n/${lng}.json`).then((r) => r.json()).catch(() => (lng === 'zh' ? zh : en))
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(data))
  }
  i18n.addResources(lng, 'translation', data)
}

load(stored || browser)

useUIStore.getState().setLang(i18n.language)

if (!stored && browser !== defaultLng) {
  i18n.changeLanguage(browser)
  showToast(`Detected ${browser}, switched to ${browser}`)
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lng)
  }
  useUIStore.getState().setLang(lng)
  load(lng)
})

export default i18n

