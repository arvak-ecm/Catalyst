import About from '@/components/about'
import SidebarMenuItemLink from '@/components/custom/sidebar/SidebarMenuItemLink'
import TitleSideBar from '@/components/custom/sidebar/titleSideBar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { useStore } from '@/hooks/useStore'
import { isOpenSideBar } from '@/store/storeGlobal'
import { useTranslation } from 'react-i18next'

interface propsBase {
  children: React.ReactNode
}
interface propsMenu {
  children?: React.ReactNode
  dbName: string
  tableName: string
  menu: {
    title: string
    icon: React.ReactNode
    href: string
  }[]
  i18n: string
  iconApp: React.ReactNode
}

const SIDEBAR_WIDTH = '200px'

const SideBarBase = ({ children }: propsBase) => {
  return (
    <SidebarProvider
      open={isOpenSideBar.value}
      className="relative min-h-0 h-full"
      style={{
        ['--sidebar-width' as string]: SIDEBAR_WIDTH
      }}
    >
      {children}
    </SidebarProvider>
  )
}

const MenuSidebar = ({
  children,
  dbName,
  tableName,
  i18n,
  menu,
  iconApp
}: propsMenu) => {
  const store = useStore(dbName, tableName)
  const { t } = useTranslation()
  return (
    <Sidebar collapsible="icon" className="absolute">
      <SidebarHeader>
        <TitleSideBar
          icon={iconApp}
          title={t(`${i18n}.name`)}
          about={
            <About
              appName={t(`${i18n}.name`)}
              version={t(`${i18n}.version`)}
              author={t(`${i18n}.author`)}
              description={t(`${i18n}.description`)}
            />
          }
        />
        <SidebarTrigger
          className="absolute right-[-7px] top-[1px] z-30"
          onClick={async () => {
            isOpenSideBar.value = !isOpenSideBar.value
            await store.set<boolean>('IS_OPEN_SIDEBAR', isOpenSideBar.value)
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t(`${i18n}.sidebar.labelLinks`)}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItemLink
                  key={item.title}
                  title={t(`${i18n}.sidebar.links.${item.title}`)}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

const ContentSidebar = ({ children }: propsBase) => {
  return <main className="flex-1">{children}</main>
}

SideBarBase.Menu = MenuSidebar
SideBarBase.Content = ContentSidebar

export default SideBarBase
