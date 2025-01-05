import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import TooltipFact from '../tooltipFact'

interface props {
  title: string
  icon: React.ReactNode
  href: string
}
const SidebarMenuItemLink = ({ title, icon, href }: props) => {
  const { open } = useSidebar()
  return (
    <TooltipFact label={title} side="right" active={open}>
      <SidebarMenuItem key={title}>
        <SidebarMenuButton asChild className="cursor-pointer">
          <Link
            to={href}
            className="flex items-center gap-2 data-[status=active]:text-accent-foreground border-[1px] border-transparent data-[status=active]:border-primary data-[status=active]:border data-[status=active]:bg-itemSelected [&>svg]:data-[status=active]:fill-icon-active transition-all"
          >
            {icon}
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </TooltipFact>
  )
}

export default SidebarMenuItemLink
