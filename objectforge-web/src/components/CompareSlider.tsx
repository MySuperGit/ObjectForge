import { useState, ReactNode } from 'react'

interface Props {
  left: ReactNode
  right: ReactNode
}

export default function CompareSlider({ left, right }: Props) {
  const [value, setValue] = useState(50)
  return (
    <div className="relative overflow-hidden">
      <div className="relative">
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${value}%` }}
        >
          {left}
        </div>
        {right}
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full absolute bottom-0 accent-brand"
      />
    </div>
  )
}
