import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-10 border-t border-bg-9 bg-bg-3 text-sm text-fg-2">
      <div className="max-w-5xl mx-auto p-6 grid gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold mb-2">ObjectForge</h4>
          <p>© {new Date().getFullYear()} ObjectForge</p>
        </div>
        <div className="space-y-1">
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
            {t('footer.help')}
          </a>
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
            {t('footer.terms')}
          </a>
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
            {t('footer.privacy')}
          </a>
        </div>
        <div className="space-y-1">
          <a href="mailto:hi@example.com" className="block hover:underline">
            hi@example.com
          </a>
          <div className="flex gap-3">
            <a href="#" aria-label="twitter" className="hover:underline">
              Twitter
            </a>
            <a href="#" aria-label="github" className="hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
