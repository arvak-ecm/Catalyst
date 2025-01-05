import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

interface Props {
  children: React.ReactNode
  label: string | React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  active?: boolean
}

const TooltipFact = ({ children, label, side, active = true }: Props) => {
  if (active) return <>{children}</>
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipFact
