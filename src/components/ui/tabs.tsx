import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const Tabs = TabsPrimitive.Root

const tabListVariants = cva(
  'inline-flex items-center justify-center rounded-sm bg-muted  text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        mini: ''
      },
      size: {
        default: 'p-1 h-9',
        mini: 'p-1 h-7'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: 'default' | 'mini'
    size?: 'default' | 'mini'
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabListVariants({ variant, size }), '', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-300  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-sm data-[state=active]:bg-background data-[state=active]:text-accent-foreground/90 data-[state=active]:shadow',
        mini: 'border-b-[2px] border-b-transparent gap-2 data-[state=active]:border-b-[2px] data-[state=active]:border-b-primary  data-[state=active]:text-accent-foreground/90'
      },
      size: {
        default: 'px-3 py-1 text-xs',
        mini: 'px-0 mx-2 py-0 text-xs'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'default' | 'mini'
    size?: 'default' | 'mini'
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabTriggerVariants({ variant, size }), '', className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
