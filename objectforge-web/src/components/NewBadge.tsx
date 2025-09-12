type Props = { isNew?: boolean; until?: string }
export default function NewBadge({ isNew, until }: Props) {
  const now = new Date()
  const visible = isNew && until ? now <= new Date(until) : !!isNew
  return (
    <div className="absolute right-2 top-2 w-12 h-4 flex items-center justify-end">
      {visible && (
        <span className="px-1.5 py-0.5 text-[10px] rounded bg-new text-fg-white leading-none">NEW</span>
      )}
    </div>
  )
}
