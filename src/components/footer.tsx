import { cn } from '@/lib/utils'

interface props {
  className?: string
  children?: React.ReactNode
}

const Footer = ({ className, children, ...props }: props) => {
  return (
    <footer
      className={cn(
        'min-h-(--layout-footer-height) border-t border-panel-border bg-main ',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
}

export default Footer
