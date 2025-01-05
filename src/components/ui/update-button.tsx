import { RefreshCcw } from 'lucide-react'

interface UpdateButtonProps {
  isUpdating: boolean
  onClick: () => void
}

export function UpdateButton({ isUpdating, onClick }: UpdateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isUpdating}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                 rounded-[--radius] transition-colors duration-200
                 ${
                   isUpdating
                     ? 'bg-primary/10 text-primary cursor-wait'
                     : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                 }`}
    >
      <RefreshCcw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
      <span>{isUpdating ? 'Actualizando...' : 'Actualizar todo'}</span>
    </button>
  )
}
