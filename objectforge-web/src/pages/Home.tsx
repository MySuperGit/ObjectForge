import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Carousel from '../components/Carousel'
import FeatureCard from '../components/FeatureCard'
import CompareSlider from '../components/CompareSlider'
import { api } from '../lib/api'
import { mockFeatures } from '../lib/features.mock'
import type { Feature } from '../lib/types'

export default function Home() {
  const { data: features = mockFeatures } = useQuery<Feature[]>({
    queryKey: ['features'],
    queryFn: () => api.get('/features').catch(() => mockFeatures)
  })

  const slides = features.map((f) => <FeatureCard key={f.id} feature={f} />)

  const [orig, setOrig] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOrig(URL.createObjectURL(file))
    try {
      const blob = await api.removeBg(file)
      setResult(URL.createObjectURL(blob))
    } catch (e) {
      // ignore
    }
  }

  const useSample = () => {
    const size = 200
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#2B83DA'
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, 50, 0, Math.PI * 2)
    ctx.fill()
    const sampleOrig = canvas.toDataURL()

    const canvas2 = document.createElement('canvas')
    canvas2.width = canvas2.height = size
    const ctx2 = canvas2.getContext('2d')!
    ctx2.fillStyle = '#2B83DA'
    ctx2.beginPath()
    ctx2.arc(size / 2, size / 2, 50, 0, Math.PI * 2)
    ctx2.fill()
    const sampleRes = canvas2.toDataURL('image/png')

    setOrig(sampleOrig)
    setResult(sampleRes)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      <Carousel slides={slides} />
      <div>
        <div className="mb-2 flex gap-2">
          <input type="file" accept="image/*" onChange={onUpload} />
          <button
            onClick={useSample}
            className="px-3 py-1 rounded bg-accent2 text-fg-white"
          >
            Use Sample
          </button>
          {result && (
            <a
              href={result}
              download="removed.png"
              className="px-3 py-1 rounded bg-accent1 text-fg-white"
            >
              Download
            </a>
          )}
        </div>
        {orig && result ? (
          <CompareSlider
            left={<img src={orig} alt="original" className="block max-w-full" />}
            right={<img src={result} alt="result" className="block max-w-full" />}
          />
        ) : (
          <div className="border-2 border-dashed border-accent1 p-8 text-center text-fg-2">
            Upload an image to remove background
          </div>
        )}
      </div>
    </div>
  )
}
