import { useEffect, useState } from 'react'
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

