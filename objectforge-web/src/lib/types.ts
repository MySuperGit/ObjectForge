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

export type PricingPlan = {
  id: string
  title: string
  price: string
  features: string[]
  cta: string
}

export type FAQ = {
  question: string
  answer: string
}
