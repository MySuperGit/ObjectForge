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
          <h1 className="relative text-xl font-semibold flex items-center gap-2">
            {slug}
            <NewBadge />
          </h1>
          <Link to="/dashboard" className="text-brand underline hover:no-underline">
            进入操作中心
          </Link>
        </header>

        <section className="border p-4 rounded shadow-card">
          <h2 className="font-medium mb-2">生成区</h2>
          <form className="space-y-3">
            <input className="w-full border rounded p-2" placeholder="Prompt" />
            <input className="w-full border rounded p-2" placeholder="模板" />
            <input className="w-full border rounded p-2" placeholder="尺寸" />
            <button type="button" className="px-4 py-2 rounded bg-brand text-fg-white">
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
          columns={(containerWidth) => (containerWidth < 600 ? 1 : containerWidth < 900 ? 2 : 3)}
          onClick={({ index }) => setIndex(index)}
          renderPhoto={(props) => <ImageWrapper {...props} />}
        />
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={samplePhotos.map((p) => ({ src: p.src }))}
        />
      </div>
    </div>
  )
}

function ImageWrapper({ photo, renderDefaultPhoto, wrapperStyle }: RenderPhotoProps) {
  return (
    <div className="image-card" style={wrapperStyle}>
      {renderDefaultPhoto({ photo, imageProps: { loading: 'lazy', className: 'w-full h-auto' } })}
    </div>
  )
}
