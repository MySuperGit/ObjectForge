import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Carousel from '../components/Carousel'
import { gallery } from '../lib/gallery.mock'
import '../components/ImageCard.css'

const notices = [
  '活动一：上传作品赢奖品',
  '节日特别专题上线',
  '技术分享会报名中'
]

const tagDefs = [
  { key: 'all', label: '全部' },
  { key: 'gallery', label: '图库' },
  { key: 'idea', label: '灵感' },
  { key: 'hot', label: '热门' },
  { key: 'festival', label: '节日' },
  { key: 'tech', label: '技术' }
]

export default function Plaza() {
  const [activeTag, setActiveTag] = useState('all')
  const [index, setIndex] = useState(-1)

  const filtered =
    activeTag === 'all'
      ? gallery
      : gallery.filter((item) => item.tags.includes(activeTag))

  const slides = filtered.map((g) => ({ src: g.full }))

  const breakpointColumns = { default: 3, 1024: 3, 768: 2, 500: 1 }

  return (
    <div className="p-4 space-y-4">
      <Carousel
        slides={notices.map((n, i) => (
          <div
            key={i}
            className="p-2 text-center bg-accent2 text-fg-white"
          >
            {n}
          </div>
        ))}
      />

      <div className="flex gap-2 flex-wrap">
        {tagDefs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTag(t.key)}
            className={`px-3 py-1 rounded border transition-colors ${
              activeTag === t.key
                ? 'bg-brand text-fg-white'
                : 'bg-bg-9 text-fg-1'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="mb-4 image-card cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <img
              src={item.thumb}
              alt={item.author}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        ))}
      </Masonry>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  )
}
