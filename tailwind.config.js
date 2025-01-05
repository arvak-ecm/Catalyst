/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    transitionDuration: {
      DEFAULT: 'var(--transition-duration, 150ms)'
    },
    animationDuration: {
      DEFAULT: 'var(--animation-duration, 150ms)'
    },
    extend: {
      fontSize: {
        xs: ['0.70rem', '0.95rem']
      },
      boxShadow: {
        'container-right': '8px 0 15px -2px hsl(var(--muted)/10)',
        'container-left': '-8px 0 15px -2px hsl(var(--muted)/10)'
      },
      gridTemplateRows: {
        layout: 'var(--layout-header-height) 1fr var(--layout-footer-height)',
        'layout-app': 'var(--layout-header-height) 1fr',
        'layout-curl': '80px 1fr'
      },
      transitionDuration: {
        custom: 'var(--transition-duration)'
      },
      animationDuration: {
        custom: 'var(--animation-duration)'
      },
      colors: {
        'icon-active': 'hsl(var(--primary) / var(--opacity-icon-selected))',
        'icon-active-open': 'hsl(var(--primary) / var(--opacity-icon-open))',
        main: 'hsl(var(--main-background))',
        itemSelected: 'hsl(var(--primary) / var(--opacity-item-selected))',
        itemHover: 'hsl(var(--primary) / var(--opacity-item-hover))',
        'panel-border': 'hsl(var(--muted-foreground)/0.3)',
        panel: 'hsl(var(--muted))',
        system: 'hsl(var(--color-system))',
        'system-border': 'hsl(var(--color-system-border))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        'primary-foreground': 'hsl(var(--primary-foreground))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '&>*')
    }),
    require('tailwindcss-animate')
    //require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
