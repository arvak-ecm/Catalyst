import { Copy, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { actionBar } from '@/store/storeGlobal'

interface props {
  className?: string
  idAction: string
}

const actions = [
  {
    name: 'copy',
    icon: <Copy />,
    action: 'COPY_'
  },
  {
    name: 'clear',
    icon: <Trash />,
    action: 'CLEAR_'
  }
]

const ActionsBar = ({ className, idAction }: props) => {
  const handleClick = (action: string) => {
    actionBar.value = action
  }
  return (
    <div className={cn('flex flex-row gap-0', className)}>
      {actions.map((el, index) => (
        <Button
          key={index}
          variant="icon"
          size="icon"
          onClick={() => handleClick(el.action + idAction)}
        >
          {el.icon}
        </Button>
      ))}
    </div>
  )
}

export default ActionsBar
