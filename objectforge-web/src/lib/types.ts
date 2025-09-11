export interface Feature {
  id: number
  title: string
  description: string
  slug: string
  isNew?: boolean
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
