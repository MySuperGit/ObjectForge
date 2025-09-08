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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const timer = useRef<number>()

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current)
  }, [])

  const play = useCallback(() => {
    if (!emblaApi || prefersReduce) return
    stop()
    timer.current = window.setInterval(() => emblaApi.scrollNext(), 3000)
  }, [emblaApi, stop, prefersReduce])

  useEffect(() => {
    play()
    return stop
  }, [play, stop])

  return (
    <div className="p-4">
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
