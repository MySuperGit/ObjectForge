import { useEffect, useRef, useState } from 'react'

export function useAppear<T extends HTMLElement>(rootMargin = '80px') {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      })
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, visible }
}
