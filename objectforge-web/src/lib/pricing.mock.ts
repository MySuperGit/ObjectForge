import { PricingPlan, FAQ } from './types'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    title: 'Monthly',
    price: '$9/mo',
    features: ['Unlimited generations', 'Priority support'],
    cta: 'Subscribe'
  },
  {
    id: 'credits',
    title: 'Credits',
    price: '$15/100 credits',
    features: ['Pay as you go', 'No expiration'],
    cta: 'Buy Credits'
  },
  {
    id: 'lifetime',
    title: 'Lifetime',
    price: '$199 one-time',
    features: ['All future updates', 'Unlimited access'],
    cta: 'Purchase'
  }
]

export const faqs: FAQ[] = [
  {
    question: 'How does billing work?',
    answer: 'Monthly plans renew automatically each month but can be cancelled anytime.'
  },
  { question: 'Do credits expire?', answer: 'Credits never expire and remain in your account.' },
  {
    question: 'Is there a refund policy?',
    answer: 'Lifetime purchases can be refunded within 7 days if not satisfied.'
  }
]
