<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export interface Feature {
  id: number
  title: string
  description: string
  slug: string
  isNew?: boolean
}

export interface Review {
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
  id: number
  author: string
  quote: string
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export interface PricingPlan {
  id: string
=======
export type PlanId = 'monthly' | 'credits' | 'lifetime'
export type Plan = {
  id: PlanId
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
export type PlanId = 'monthly' | 'credits' | 'lifetime'
export type Plan = {
  id: PlanId
>>>>>>> pr-local-swagger
=======
export type PricingPlan = {
  id: string
>>>>>>> pr-ui-cors
  title: string
  price: string
  features: string[]
  cta: string
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
}

export interface FAQ {
=======
=======
>>>>>>> pr-local-swagger
  badge?: 'Best Value' | 'Popular' | null
}

export type FAQ = {
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
}

export type FAQ = {
>>>>>>> pr-ui-cors
  question: string
  answer: string
}
