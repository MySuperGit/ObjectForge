import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> pr-local-swagger

import type { Feature } from './types'

export function isFeatureNew(f: Feature) {
  return (
    f.isNew === true &&
    (!f.newBadgeUntil || new Date(f.newBadgeUntil) > new Date())
  )
}
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
