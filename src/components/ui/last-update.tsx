import { Info } from 'lucide-react'

interface LastUpdateProps {
  date: Date
}

export function LastUpdate({ date }: LastUpdateProps) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5
                   bg-primary/10 text-primary rounded-[--radius]
                   hover:bg-primary/20 transition-colors duration-200
                   cursor-default"
    >
      <Info className="w-4 h-4" />
      <time
        className="text-sm font-medium"
        dateTime={date.toISOString()}
        title="Última actualización"
      >
        {date.toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </time>
    </div>
  )
}
