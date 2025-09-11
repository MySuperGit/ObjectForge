import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  slides: React.ReactNode[]
}

export default function Carousel({ slides }: Props) {
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
  )
}
