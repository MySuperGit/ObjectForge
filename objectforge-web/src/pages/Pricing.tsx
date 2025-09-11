import { pricingPlans as mockPlans, faqs as mockFaqs } from '../lib/pricing.mock'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../components/ui/accordion'

export default function Pricing() {
  const { data: plans = mockPlans } = useQuery({
    queryKey: ['pricing'],
    queryFn: () => api.get('/pricing').catch(() => mockPlans)
  })
  const { data: faqs = mockFaqs } = useQuery({
    queryKey: ['pricing-faq'],
    queryFn: () => Promise.resolve(mockFaqs)
  })

  return (
    <div className="p-4 space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className="rounded border bg-bg-9 p-6 shadow-card flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
            <p className="text-2xl font-bold mb-4">{p.price}</p>
            <ul className="mb-4 space-y-1 flex-1">
              {p.features.map((f, i) => (
                <li key={i} className="text-sm">• {f}</li>
              ))}
            </ul>
            <button className="mt-auto bg-brand text-fg-white rounded px-4 py-2">
              {p.cta}
            </button>
          </div>
        ))}
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
