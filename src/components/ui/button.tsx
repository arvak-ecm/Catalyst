import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { X } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        muted: 'bg-muted text-muted-foreground shadow-sm hover:bg-muted/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        closeTab: 'ml-auto hover:bg-red-600 hover:text-white cursor-pointer',
        link: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 gap-0',
        icon: 'hover:text-primary gap-0',
        toggleSidebar: 'hover:bg-none hover:text-primary border bg-accent'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 rounded-sm px-2 text-xs',
        lg: 'h-10 rounded-sm px-8',
        icon: 'h-7 w-7 min-h-7 min-w-7',
        miniIcon: 'h-6 w-6',
        link: 'h-6 w-6 rounded-sm px-0 text-xs',
        squareIcon: 'h-7 w-7',
        toggleSidebar: 'p-1 m-0 size-3.5 [&_svg]:size-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  tooltip?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, tooltip, side, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    //retorna un div si tooltip si no el Comp

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {variant === 'closeTab' ? (
                <span
                  className={cn(buttonVariants({ variant, size, className }))}
                  ref={ref}
                  {...props}
                >
                  <X className="h-4 w-4 hover:text-white" />
                </span>
              ) : (
                <Comp
                  className={cn(buttonVariants({ variant, size, className }))}
                  ref={ref}
                  {...props}
                />
              )}
            </TooltipTrigger>
            <TooltipContent side={side || 'top'}>
              <p className="text-center">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return (
      <>
        {variant === 'closeTab' ? (
          <span
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            <X className="h-4 w-4 hover:text-white" />
          </span>
        ) : (
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
