<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import { reviews } from '../lib/reviews.mock'

export default function Reviews() {
=======
import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import { reviews as mockReviews } from '../lib/reviews.mock'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export default function Reviews() {
  const { data: reviews = mockReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.get('/reviews').catch(() => mockReviews)
  })
  const prefersReduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
>>>>>>> pr-ui-cors
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const timer = useRef<number>()

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current)
  }, [])

  const play = useCallback(() => {
<<<<<<< HEAD
    if (!emblaApi) return
    stop()
    timer.current = window.setInterval(() => emblaApi.scrollNext(), 3000)
  }, [emblaApi, stop])
=======
    if (!emblaApi || prefersReduce) return
    stop()
    timer.current = window.setInterval(() => emblaApi.scrollNext(), 3000)
  }, [emblaApi, stop, prefersReduce])
>>>>>>> pr-ui-cors

  useEffect(() => {
    play()
    return stop
  }, [play, stop])

  return (
    <div className="p-4">
<<<<<<< HEAD
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="h-full rounded bg-bg-9 p-4 shadow-card flex flex-col">
                <p className="text-sm mb-2 flex-1">&ldquo;{r.quote}&rdquo;</p>
                <span className="text-right text-sm font-medium">{r.author}</span>
              </div>
=======
import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
=======
import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import http from '../lib/http'
>>>>>>> pr-local-swagger

type Review = { id:string; user:string; avatar?:string|null; rating:number; content:string; country?:string }

function Stars({ n }: { n:number }) {
  return <div className="text-brand">{'★★★★★☆☆☆☆☆'.slice(5 - Math.min(5, n), 10 - Math.max(0, 5-n))}</div>
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="relative h-full rounded-2xl border border-bg-9 bg-bg-white p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bg-9 overflow-hidden flex items-center justify-center">
          {r.avatar ? <img src={r.avatar} alt={r.user} /> : <span className="text-sm">{r.user[0]}</span>}
        </div>
        <div className="text-sm">
          <div className="font-semibold">{r.user}</div>
          <div className="text-xs text-fg-2">{r.country || '—'}</div>
        </div>
      </div>
      <div className="my-3 text-sm leading-relaxed">{r.content}</div>
      <div className="text-sm"><Stars n={r.rating} /></div>
    </div>
  )
}

export default function Reviews() {
  const [list, setList] = useState<Review[]>([])
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true })
  const timer = useRef<number | null>(null)

  useEffect(() => {
<<<<<<< HEAD
    fetch(`${API_BASE}/reviews`).then(r => r.json()).then(setList).catch(() => setList([]))
=======
    let cancelled = false
    const load = async () => {
      try {
        const { data } = await http.get<Review[]>('/reviews', {
          headers: { 'Cache-Control': 'no-store', 'X-Skip-Toast': '1' },
        })
        if (!cancelled) setList(data)
      } catch {
        if (!cancelled) setList([])
      }
    }
    load()
    return () => {
      cancelled = true
    }
>>>>>>> pr-local-swagger
  }, [])

  useEffect(() => {
    if (!embla) return
    const stop = () => { if (timer.current) { clearInterval(timer.current); timer.current = null } }
    const start = () => { stop(); timer.current = window.setInterval(() => embla.scrollNext(), 4000) }
    start()
    const node = embla.containerNode()
    node.addEventListener('mouseenter', stop)
    node.addEventListener('mouseleave', start)
    return () => { stop(); node.removeEventListener('mouseenter', stop); node.removeEventListener('mouseleave', start) }
  }, [embla])

  const slideClass = "pl-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">用户评价</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -pl-4">
          {list.map(r => (
            <div className={slideClass} key={r.id}>
              <ReviewCard r={r} />
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
  )
export default function Reviews() {
  return <div className="p-4">Reviews</div>
=======
=======
>>>>>>> pr-local-swagger
      {list.length === 0 && (
        <div className="text-sm text-fg-2">暂无数据</div>
      )}
    </div>
  )
}
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
      <div className="relative" aria-roledescription="carousel">
        <div
          ref={emblaRef}
          className="overflow-hidden"
          onMouseEnter={stop}
          onMouseLeave={play}
        >
          <div className="flex">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="h-full rounded bg-bg-9 p-4 shadow-card flex flex-col">
                  <p className="text-sm mb-2 flex-1">&ldquo;{r.quote}&rdquo;</p>
                  <span className="text-right text-sm font-medium">{r.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg-9/70 p-2 rounded focus:outline-none"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous reviews"
        >
          ‹
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg-9/70 p-2 rounded focus:outline-none"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next reviews"
        >
          ›
        </button>
      </div>
    </div>
  )
}
>>>>>>> pr-ui-cors
