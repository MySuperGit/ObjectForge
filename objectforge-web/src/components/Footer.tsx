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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
            {t('footer.help')}
          </a>
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
            {t('footer.terms')}
          </a>
          <a href="#" className="block hover:underline" target="_blank" rel="noreferrer">
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
          <a href="/help" className="block hover:underline">
            {t('footer.help')}
          </a>
          <a href="/terms" className="block hover:underline">
            {t('footer.terms')}
          </a>
          <a href="/privacy" className="block hover:underline">
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
            {t('footer.privacy')}
          </a>
        </div>
        <div className="space-y-1">
          <a href="mailto:hi@example.com" className="block hover:underline">
            hi@example.com
          </a>
          <div className="flex gap-3">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <a href="#" aria-label="twitter" className="hover:underline">
              Twitter
            </a>
            <a href="#" aria-label="github" className="hover:underline">
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
            <a href="https://twitter.com" aria-label="twitter" className="hover:underline" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://github.com" aria-label="github" className="hover:underline" target="_blank" rel="noreferrer">
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
