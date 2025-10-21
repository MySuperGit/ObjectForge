<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
import { useEffect, useMemo, useState } from 'react'
import Masonry from 'react-masonry-css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useAppear } from '../hooks/useAppear'
<<<<<<< HEAD
<<<<<<< HEAD

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
=======
import http from '../lib/http'
>>>>>>> pr-local-swagger
=======

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
>>>>>>> pr-ui-cors
type Item = { id:string; thumb:string; full:string; tags?:string[]; author?:string }

const TABS = ['图库','灵感','热门','节日','技术'] as const
const breakpointCols = { default: 4, 1280: 4, 1024: 3, 768: 2, 480: 1 }

function NoticeBar() {
  return (
    <div className="w-full rounded-2xl bg-bg-2 text-fg-1 border border-bg-9 px-4 py-2 text-sm">
      🎉 限时活动：本周上传抠图 100 次免积分 · 新增「节日模板」专栏
    </div>
  )
}

export default function Plaza() {
  const [tab, setTab] = useState<typeof TABS[number]>('图库')
  const [list, setList] = useState<Item[]>([])
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    fetch(`${API_BASE}/gallery`).then(r => r.json()).then(setList).catch(() => setList([]))
=======
    let cancelled = false
    const load = async () => {
      try {
        const { data } = await http.get<Item[]>('/gallery', {
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
=======
    fetch(`${API_BASE}/gallery`).then(r => r.json()).then(setList).catch(() => setList([]))
>>>>>>> pr-ui-cors
  }, [])

  const filtered = useMemo(() => {
    if (tab === '图库') return list
    return list.filter(it => it.tags?.includes(tab))
  }, [tab, list])

  const slides = filtered.map(it => ({ src: it.full }))

  return (
    <div className="space-y-4">
      <NoticeBar />

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t}
            className={`px-3 py-1.5 rounded-xl text-sm border ${t===tab ? 'bg-brand text-fg-white border-transparent' : 'bg-bg-white border-bg-9'}`}
            onClick={() => setTab(t)}>{t}</button>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
        ))}
      </div>

      <Masonry
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
        breakpointCols={breakpointCols}
        className="flex gap-4"
        columnClassName="space-y-4"
      >
        {filtered.map((it, i) => <PlazaCard key={it.id} it={it} onClick={() => { setIndex(i); setOpen(true) }} />)}
      </Masonry>

      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} />
    </div>
  )
}

function PlazaCard({ it, onClick }: { it: Item; onClick: () => void }) {
  const { ref, visible } = useAppear<HTMLButtonElement>()
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-2xl border border-bg-9 bg-bg-white card-zoom ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition`}
    >
      <img src={it.thumb} alt="" loading="lazy" className="w-full h-auto object-cover" />
      {it.author && (
        <span className="absolute left-2 bottom-2 text-xs px-2 py-0.5 rounded bg-bg-white/85 border border-bg-9">{it.author}</span>
      )}
    </button>
  )
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
