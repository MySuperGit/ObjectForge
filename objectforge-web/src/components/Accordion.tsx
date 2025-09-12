import * as RA from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

export function AccordionRoot(props: RA.AccordionSingleProps) {
  return <RA.Root {...props} className="w-full" />
}

export function AccordionItem({ value, trigger, children }:{
  value: string; trigger: ReactNode; children: ReactNode;
}) {
  return (
    <RA.Item value={value} className="border-b border-bg-9">
      <RA.Header>
        <RA.Trigger className="w-full flex items-center justify-between py-3 text-left">
          <span className="text-sm font-semibold">{trigger}</span>
          <ChevronDown className="w-4 h-4 transition data-[state=open]:rotate-180" />
        </RA.Trigger>
      </RA.Header>
      <RA.Content className="pb-3 text-sm text-fg-2 data-[state=closed]:hidden">
        {children}
      </RA.Content>
    </RA.Item>
  )
}
