import { pricingPlans, faqs } from '../lib/pricing.mock'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../components/ui/accordion'

export default function Pricing() {
  return (
    <div className="p-4 space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((p) => (
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
