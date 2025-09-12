import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
=======

import type { Feature } from './types'

export function isFeatureNew(f: Feature) {
  return (
    f.isNew === true &&
    (!f.newBadgeUntil || new Date(f.newBadgeUntil) > new Date())
  )
}
>>>>>>> origin/codex/optimize-my-page-zy1m9v
