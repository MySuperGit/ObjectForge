import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors

import type { Feature } from './types'

export function isFeatureNew(f: Feature) {
  return (
    f.isNew === true &&
    (!f.newBadgeUntil || new Date(f.newBadgeUntil) > new Date())
  )
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
