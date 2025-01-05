import { cn } from '@/lib/utils'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '../../ui/sidebar'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface props {
  className?: string
  icon: React.ReactNode
  title: string
  about?: React.ReactNode
}

const TitleSideBar = ({ className, icon, title, about }: props) => {
  const { open } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DialogTrigger asChild className="cursor-pointer">
            <SidebarMenuButton
              asChild
              className="cursor-pointer h-10 fill-transparent shadow-sm text-accent "
            >
              <div
                className={cn(
                  'flex items-center justify-start text-[16px] text-accent-foreground',
                  open && 'justify-center',
                  className
                )}
              >
                {icon}
                {title}
              </div>
            </SidebarMenuButton>
          </DialogTrigger>
          {about}
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default TitleSideBar
