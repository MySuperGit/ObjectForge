<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PhotoAlbum, { Photo, RenderPhotoProps } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import NewBadge from '../components/NewBadge'
import '../components/ImageCard.css'

const samplePhotos: Photo[] = [
  { src: 'https://picsum.photos/seed/1/600/400', width: 600, height: 400 },
  { src: 'https://picsum.photos/seed/2/600/800', width: 600, height: 800 },
  { src: 'https://picsum.photos/seed/3/800/600', width: 800, height: 600 },
  { src: 'https://picsum.photos/seed/4/700/700', width: 700, height: 700 },
  { src: 'https://picsum.photos/seed/5/600/500', width: 600, height: 500 },
  { src: 'https://picsum.photos/seed/6/500/600', width: 500, height: 600 }
]

export default function FeatureDetail() {
  const { slug } = useParams()
  const [index, setIndex] = useState(-1)

  return (
    <div className="p-4 md:grid md:grid-cols-2 md:gap-6">
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            {slug}
            <NewBadge />
          </h1>
          <Link
            to="/dashboard"
            className="text-brand underline hover:no-underline"
          >
            进入操作中心
          </Link>
        </header>

        <section className="border p-4 rounded shadow-card">
          <h2 className="font-medium mb-2">生成区</h2>
          <form className="space-y-3">
            <input
              className="w-full border rounded p-2"
              placeholder="Prompt"
            />
            <input
              className="w-full border rounded p-2"
              placeholder="模板"
            />
            <input
              className="w-full border rounded p-2"
              placeholder="尺寸"
            />
            <button
              type="button"
              className="px-4 py-2 rounded bg-brand text-fg-white"
            >
              生成
            </button>
          </form>
        </section>

        <section className="border p-4 rounded shadow-card h-64 overflow-auto">
          <h2 className="font-medium mb-2">对话区</h2>
          <p className="text-sm text-fg-2">对话占位</p>
        </section>
      </div>

      <div className="mt-6 md:mt-0">
        <PhotoAlbum
          layout="columns"
          photos={samplePhotos}
          columns={(containerWidth) =>
            containerWidth < 600 ? 1 : containerWidth < 900 ? 2 : 3
          }
          onClick={({ index }) => setIndex(index)}
          renderPhoto={(props) => <ImageWrapper {...props} />}
        />
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={samplePhotos.map((p) => ({ src: p.src }))}
        />
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
<<<<<<< HEAD
<<<<<<< HEAD

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
=======
import http from '../lib/http'
>>>>>>> pr-local-swagger
=======

const API_BASE = import.meta.env.VITE_API_BASE || '/api'
>>>>>>> pr-ui-cors

type GItem = { id: string; thumb: string; full: string; tags?: string[]; author?: string }

export default function FeatureDetail() {
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const { t } = useTranslation()
  const [gallery, setGallery] = useState<GItem[]>([])
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    fetch(`${API_BASE}/gallery`).then(r => r.json()).then(setGallery).catch(()=>setGallery([]))
=======
    let cancelled = false
    const load = async () => {
      try {
        const { data } = await http.get<GItem[]>('/gallery', {
          headers: { 'Cache-Control': 'no-store', 'X-Skip-Toast': '1' },
        })
        if (!cancelled) setGallery(data)
      } catch {
        if (!cancelled) setGallery([])
      }
    }
    load()
    return () => {
      cancelled = true
    }
>>>>>>> pr-local-swagger
=======
    fetch(`${API_BASE}/gallery`).then(r => r.json()).then(setGallery).catch(()=>setGallery([]))
>>>>>>> pr-ui-cors
  }, [])

  const slides = useMemo(() => gallery.map(g => ({ src: g.full })), [gallery])

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-6">
      {/* 左侧：生成区 + 对话区 */}
      <div className="space-y-4">
        <div className="bg-bg-white border border-bg-9 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">生成设置</h2>
            <button className="px-3 py-1.5 rounded-xl bg-brand text-fg-white text-sm"
                    onClick={() => nav(`/features/${slug}?mode=operate`)}>{t('cta.goOperate')}</button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <label className="block mb-1">Prompt</label>
              <textarea className="w-full h-24 rounded-xl border border-bg-9 p-2" placeholder="Describe your product scene..."></textarea>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">模板</label>
                <select className="w-full rounded-xl border border-bg-9">
                  <option>家居白底</option><option>北欧客厅</option><option>节日氛围</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">尺寸</label>
                <select className="w-full rounded-xl border border-bg-9">
                  <option>1:1 (1024)</option><option>4:5 (1080×1350)</option><option>16:9 (1280×720)</option>
                </select>
              </div>
            </div>
            <div>
              <button className="px-3 py-2 rounded-xl bg-brand text-fg-white text-sm">Generate（占位）</button>
            </div>
          </div>
        </div>

        <div className="bg-bg-white border border-bg-9 rounded-2xl p-4">
          <h3 className="font-semibold mb-2">对话</h3>
          <div className="h-40 overflow-y-auto rounded-xl border border-bg-9 p-2 text-sm bg-bg-9/40">
            <div className="mb-2"><b>AI：</b> 你好！描述一下你想要的商品场景吧。</div>
            <div className="mb-2"><b>你：</b> 北欧客厅，木质地板，柔和阳光，白色花瓶。</div>
            <div className="mb-2"><b>AI：</b> 好的，我会以简约风格渲染你的花瓶。</div>
          </div>
          <div className="mt-2 flex gap-2">
            <input className="flex-1 rounded-xl border border-bg-9 px-2 py-1 text-sm" placeholder="继续输入..." />
            <button className="px-3 py-1.5 rounded-xl border border-bg-9 text-sm bg-bg-white">发送</button>
          </div>
        </div>
      </div>

      {/* 右侧：图片墙 */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g, i) => (
            <button key={g.id} className="relative rounded-2xl overflow-hidden border border-bg-9 bg-bg-white card-zoom"
                    onClick={() => { setIndex(i); setOpen(true) }}>
              <img src={g.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} carousel={{ finite: false }} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
      </div>
    </div>
  )
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

function ImageWrapper({ photo, renderDefaultPhoto, wrapperStyle }: RenderPhotoProps) {
  return (
    <div className="image-card" style={wrapperStyle}>
      {renderDefaultPhoto({
        photo,
        imageProps: { loading: 'lazy', className: 'w-full h-auto' }
      })}
    </div>
  )
}
=======
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
