import { useEffect, useState } from 'react'
<<<<<<< HEAD
import useScrollDir from './useScrollDir'
import useIdle from './useIdle'

export default function useHeaderReveal() {
  const [hidden, setHidden] = useState(false)
  const dir = useScrollDir()
  const idle = useIdle(3000)
  const [inputFocus, setInputFocus] = useState(false)

  useEffect(() => {
    if (inputFocus) return setHidden(false)
    setHidden(dir === 'down')
  }, [dir, inputFocus])

  useEffect(() => {
    if (!inputFocus) setHidden(idle)
  }, [idle, inputFocus])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.clientY <= 80) setHidden(false)
    }
    const onFocusIn = (e: FocusEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') setInputFocus(true)
    }
    const onFocusOut = (e: FocusEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') setInputFocus(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return hidden
}

=======

export function useHeaderReveal() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    let lastY = window.scrollY
    let idle: number | null = null
    let forceShow = false

    const show = () => setVisible(true)
    const hide = () => {
      if (!forceShow) setVisible(false)
    }
    const resetIdle = () => {
      if (idle) clearTimeout(idle)
      idle = window.setTimeout(hide, 3000)
    }

    const onScroll = () => {
      const y = window.scrollY
      if (y < 10 || y < lastY) show()
      else hide()
      lastY = y
      resetIdle()
    }
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) show()
    }
    const onFocusIn = () => {
      forceShow = true
      show()
    }
    const onFocusOut = () => {
      forceShow = false
      resetIdle()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)
    resetIdle()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
      if (idle) clearTimeout(idle)
    }
  }, [])
  return visible
}

export default useHeaderReveal
>>>>>>> origin/codex/optimize-my-page-zy1m9v
