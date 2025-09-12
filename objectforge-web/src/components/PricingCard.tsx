import type { Plan } from '../lib/types'

export default function PricingCard({ p }: { p: Plan }) {
  const highlight =
    p.badge === 'Best Value' ? 'ring-2 ring-brand'
    : p.badge === 'Popular' ? 'ring-2 ring-accent2'
    : ''

  return (
    <div className={`relative rounded-2xl border border-bg-9 bg-bg-white p-5 flex flex-col ${highlight}`}>
      {p.badge && (
        <span className={`absolute -top-2 left-4 text-[11px] px-2 py-0.5 rounded
          ${p.badge==='Best Value' ? 'bg-brand text-fg-white' : 'bg-accent2 text-fg-white'}`}>
          {p.badge}
        </span>
      )}
      <div className="text-sm text-fg-2 mb-1">{p.title}</div>
      <div className="text-3xl font-bold mb-4">{p.price}</div>
      <ul className="space-y-2 text-sm mb-4">
        {p.features.map((f,i)=>(
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className="mt-auto px-4 py-2 rounded-xl bg-brand text-fg-white hover:opacity-90">{p.cta}</button>
    </div>
  )
}
