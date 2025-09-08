import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import { reviews } from '../lib/reviews.mock'

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const timer = useRef<number>()

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current)
  }, [])

  const play = useCallback(() => {
    if (!emblaApi) return
    stop()
    timer.current = window.setInterval(() => emblaApi.scrollNext(), 3000)
  }, [emblaApi, stop])

  useEffect(() => {
    play()
    return stop
  }, [play, stop])

  return (
    <div className="p-4">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
export default function Reviews() {
  return <div className="p-4">Reviews</div>
