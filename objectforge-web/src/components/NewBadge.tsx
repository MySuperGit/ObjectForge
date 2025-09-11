interface Props {
  show?: boolean
  until?: string | Date
}

export default function NewBadge({ show = false, until }: Props) {
  const active = show && (!until || new Date(until) > new Date())
  return (
    <span className="inline-block w-6 h-3.5">
      {active && (
        <span className="block w-full h-full text-[10px] leading-[14px] text-center rounded bg-new text-fg-white">
          NEW
        </span>
      )}
    </span>
  )
}

