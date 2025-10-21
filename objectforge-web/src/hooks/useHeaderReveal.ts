import { useEffect, useState } from 'react'

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
