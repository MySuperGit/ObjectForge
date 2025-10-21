<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
