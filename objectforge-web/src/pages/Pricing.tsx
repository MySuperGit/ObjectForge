<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { pricingPlans, faqs } from '../lib/pricing.mock'
=======
import { pricingPlans as mockPlans, faqs as mockFaqs } from '../lib/pricing.mock'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
>>>>>>> pr-ui-cors
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../components/ui/accordion'

export default function Pricing() {
<<<<<<< HEAD
  return (
    <div className="p-4 space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((p) => (
=======
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
>>>>>>> pr-ui-cors
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
<<<<<<< HEAD
export default function Pricing() {
  return <div className="p-4">Pricing</div>
=======
=======
>>>>>>> pr-local-swagger
import { useEffect, useMemo, useState } from 'react'
import { usePricing } from '../lib/api'
import PricingCard from '../components/PricingCard'
import { AccordionRoot, AccordionItem } from '../components/Accordion'

export default function Pricing() {
  const { data: plans = [] } = usePricing()

  const normalized = useMemo(() => {
    if (!plans.length) return []
    return plans.map(p => {
      if (p.id === 'lifetime' && !p.badge) return { ...p, badge: 'Best Value' as const }
      if (p.id === 'monthly' && !p.badge) return { ...p, badge: 'Popular' as const }
      return p
    })
  }, [plans])

  const [faq] = useState([
    { q: '积分如何计费？', a: '每次生成/处理会消耗对应积分，具体数值以功能说明为准。可在个人中心查看明细。' },
    { q: '包月是否包含高清导出？', a: '是，包月用户享有高清导出与优先队列。' },
    { q: '终身买断包含后续新增功能吗？', a: '包含大部分标准功能，部分高算力实验功能可能单独计费。' },
    { q: '支持团队/多人协作吗？', a: '是，团队版可共享图库与模板，并提供成员权限控制。' },
  ])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-bg-9 bg-bg-2 px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">选择适合你的方案</h1>
        <p className="text-sm text-fg-2">支持包月、积分与终身买断。所有价格均可随时升级。</p>
      </section>

      <section>
        <div className="grid md:grid-cols-3 gap-6">
          {normalized.map(p => <PricingCard key={p.id} p={p} />)}
          {!normalized.length && (
            <>
              <div className="h-64 rounded-2xl border border-bg-9 bg-bg-white animate-pulse" />
              <div className="h-64 rounded-2xl border border-bg-9 bg-bg-white animate-pulse" />
              <div className="h-64 rounded-2xl border border-bg-9 bg-bg-white animate-pulse" />
            </>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-bg-9 bg-bg-white p-4">
        <h2 className="text-lg font-semibold mb-3">常见问题</h2>
        <AccordionRoot type="single" collapsible defaultValue="0">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={String(i)} trigger={f.q}>
              <div className="pl-1 pr-4">{f.a}</div>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </section>
    </div>
  )
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
}
