export interface Feature {
  id: string
  title: string
  slug: string
  group: 'generate' | 'edit' | 'inspire' | 'business'
  icon: string
  isNew?: boolean
  newBadgeUntil?: string
  availability: 'available' | 'coming_soon'
  releaseAt?: string
  tags?: string[]
  description?: string
}

export interface Review {
  id: number
  author: string
  quote: string
}

export interface PricingPlan {
  id: string
  title: string
  price: string
  features: string[]
  cta: string
}

export interface FAQ {
  question: string
  answer: string
}
