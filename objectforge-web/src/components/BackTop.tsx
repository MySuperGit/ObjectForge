import { useEffect, useState } from 'react'

export default function BackTop() {
<<<<<<< HEAD
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  if (!visible) return null
  return (
    <button
      className="fixed bottom-4 right-4 p-2 bg-brand text-fg-white rounded"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
=======
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-5 bottom-6 w-10 h-10 rounded-full shadow-card bg-brand text-fg-white hover:scale-105 transition"
      aria-label="Back to top"
>>>>>>> origin/codex/optimize-my-page-zy1m9v
    >
      ↑
    </button>
  )
}
