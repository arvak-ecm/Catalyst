import { Sun, Moon, SunMoon } from 'lucide-react'

export const themeRadius = [
  { name: 'none', value: '0rem' },
  { name: 'xs', value: '0.3rem' },
  { name: 'md', value: '0.5rem' },
  { name: 'lg', value: '0.75rem' },
  { name: 'xl', value: '1rem' }
]

export const themeVariants = [
  {
    name: 'Light',
    value: 'light',
    icon: <Sun />
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: <Moon />
  },
  {
    name: 'System',
    value: 'system',
    icon: <SunMoon />
  }
]

export const themeColors = [
  {
    name: 'zinc',
    color: 'hsl(240 5.2% 33.9%)'
  },
  {
    name: 'red',
    color: 'hsl(0 72.2% 50.6%)'
  },
  {
    name: 'rose',
    color: 'hsl(346.8 77.2% 49.8%)'
  },
  {
    name: 'orange',
    color: 'hsl(24.6 95% 53.1%)'
  },
  {
    name: 'green',
    color: 'hsl(142.1 76.2% 36.3%)'
  },
  {
    name: 'blue',
    color: 'hsl(221.2 83.2% 53.3%)'
  },
  {
    name: 'yellow',
    color: 'hsl(47.9 95.8% 53.1%)'
  },
  {
    name: 'violet',
    color: 'hsl(262.1 83.3% 57.8%)'
  }
]
