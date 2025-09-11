import { Feature } from './types'

export const mockFeatures: Feature[] = [
  {
    id: 'bg-remove',
    title: 'Background Remove',
    slug: 'remove-bg',
    group: 'edit',
    icon: 'cut',
    isNew: true,
    newBadgeUntil: '2025-12-01',
    availability: 'available',
    tags: ['hot']
  },
  {
    id: 'virtual-human',
    title: 'Virtual Human',
    slug: 'virtual-human',
    group: 'generate',
    icon: 'user',
    availability: 'coming_soon',
    releaseAt: '2026-01-10',
    tags: ['tech'],
    isNew: true,
    newBadgeUntil: '2026-06-01'
  }
]
