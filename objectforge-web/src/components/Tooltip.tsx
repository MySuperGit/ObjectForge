import { ReactNode } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface Props {
  content?: ReactNode
  children: ReactNode
}

export default function Tooltip({ content, children }: Props) {
  if (!content) return <>{children}</>
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="bottom"
          className="bg-fg-1 text-fg-white text-xs px-2 py-1 rounded"
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
