import { cn } from '@/lib/utils'
import { useState } from 'react'
import { RichTextarea } from 'rich-textarea'

interface props {
  className?: string
  value?: string
}
const Style = {
  textArea: {
    width: '100%',
    height: '330px',
    outline: 'none',
    boxShadow: 'none',
    maxHeight: '330px',
    minHeight: '330px',
    caretColor: 'hsl(var(--accent-foreground))'
  }
}

const colors = ['text-red-500', 'text-blue-500', 'text-pink-500']

const TextToken = ({ className, value = '' }: props) => {
  const [inputValue, setInputValue] = useState(value)

  return (
    <div className={cn('font-mono text-sm', className)}>
      <RichTextarea
        class="text-token"
        value={inputValue}
        style={Style.textArea}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInputValue(e.target.value)
        }
      >
        {(v: string) => {
          const parts = v.split('.')
          return parts.map((part: string, index: number) => (
            <span key={index} className={`${colors[index % colors.length]}`}>
              {part}
              {index < parts.length - 1 ? '.' : ''}
            </span>
          ))
        }}
      </RichTextarea>
    </div>
  )
}
export default TextToken
