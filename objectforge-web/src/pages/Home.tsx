import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Carousel from '../components/Carousel'
import FeatureCard from '../components/FeatureCard'
import CompareSlider from '../components/CompareSlider'
import { useFeatures, removeBg } from '../lib/api'
import { mockFeatures } from '../lib/features.mock'

export default function Home() {
  const { data: features } = useFeatures()
  const list = features ?? mockFeatures
  const slides = list.map((f) => <FeatureCard key={f.id} feature={f} />)

  const [orig, setOrig] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const { t } = useTranslation()
  const nav = useNavigate()

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOrig(URL.createObjectURL(file))
    try {
      const blob = await removeBg(file)
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
    const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand')
    const white = getComputedStyle(document.documentElement).getPropertyValue('--fg-white')
    ctx.fillStyle = brand
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = white
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, 50, 0, Math.PI * 2)
    ctx.fill()
    const sampleOrig = canvas.toDataURL()

    const canvas2 = document.createElement('canvas')
    canvas2.width = canvas2.height = size
    const ctx2 = canvas2.getContext('2d')!
    ctx2.fillStyle = brand
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
        <div className="mb-2 flex gap-2 items-center flex-wrap">
          <label htmlFor="upload" className="sr-only">
            Upload image for background removal
          </label>
          <input id="upload" type="file" accept="image/*" onChange={onUpload} />
          <button onClick={useSample} className="px-3 py-1 rounded bg-accent2 text-fg-white">
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
          <button
            className="btn-brand ml-auto"
            onClick={() => nav('/features/remove-bg')}
          >
            {t('cta.goOperate')}
          </button>
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
