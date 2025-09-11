import { useEffect, useState } from 'react'

export default function useIdle(timeout = 2000) {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const reset = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), timeout)
    }
    reset()
    window.addEventListener('mousemove', reset)
    window.addEventListener('keydown', reset)
    return () => {
      window.removeEventListener('mousemove', reset)
      window.removeEventListener('keydown', reset)
      clearTimeout(timer)
    }
  }, [timeout])
  return idle
}
