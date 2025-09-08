import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  slides: React.ReactNode[]
}

export default function Carousel({ slides }: Props) {
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
    <div className="relative" aria-roledescription="carousel">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={stop}
        onMouseLeave={play}
      >
        <div className="flex">
          {slides.map((s, i) => (
            <div className="flex-[0_0_100%]" key={i}>
              {s}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg-9/70 p-2 rounded focus:outline-none"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg-9/70 p-2 rounded focus:outline-none"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  )
}
