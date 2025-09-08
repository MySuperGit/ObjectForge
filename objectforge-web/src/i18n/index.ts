import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import zh from './zh.json'
import { useUIStore } from '../store/ui'

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

useUIStore.getState().setLang(i18n.language)

if (!stored && browser !== defaultLng) {
  i18n.changeLanguage(browser)
  if (typeof window !== 'undefined') {
    console.info(`Detected ${browser}, switched to ${browser}`)
  }
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lng)
  }
  useUIStore.getState().setLang(lng)
})

export default i18n

