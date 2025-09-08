import { useEffect, useState } from 'react'

type Dir = 'up' | 'down'

export default function useScrollDir() {
  const [dir, setDir] = useState<Dir>('up')
  useEffect(() => {
    let last = window.scrollY
    const handler = () => {
      const current = window.scrollY
      setDir(current > last ? 'down' : 'up')
      last = current
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return dir
}
