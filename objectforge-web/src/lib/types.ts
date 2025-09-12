export type FeatureGroup = 'generate' | 'edit' | 'inspire' | 'business'

export type Feature = {
  id: string
  title: string
  slug: string
  group: FeatureGroup
  icon?: string
  isNew?: boolean
  newBadgeUntil?: string
  availability: 'available' | 'coming_soon'
  releaseAt?: string
  tags?: string[]
  description?: string
}

export type Review = {
  id: number
  author: string
  quote: string
}

export type PlanId = 'monthly' | 'credits' | 'lifetime'
export type Plan = {
  id: PlanId
  title: string
  price: string
  features: string[]
  cta: string
  badge?: 'Best Value' | 'Popular' | null
}

export type FAQ = {
  question: string
  answer: string
}
