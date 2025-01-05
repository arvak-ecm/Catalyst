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
import { BookMarked, CodeXml, FolderCode } from 'lucide-react'
import { memo } from 'react'
import Main from './Main'
import { useTranslation } from 'react-i18next'
import { isOpenSideBar } from '@/store/storeGlobal'
import { useStore } from '@/hooks/useStore'

const SIDEBAR_WIDTH = '200px'
const menuApp = [
  {
    title: 'collections',
    icon: <FolderCode />,
    href: '/apistream/collection'
  },
  {
    title: 'enviroment',
    icon: <BookMarked />,
    href: '/apistream/enviroment'
  }
]

const SidebarApp = () => {
  //console.log(`🚀 ======== SidebarApp ======== 🚀`)
  const store = useStore('APISTREAM', 'GLOBALS')
  const { t } = useTranslation()
  return (
    <SidebarProvider
      open={isOpenSideBar.value}
      className="relative min-h-0 h-full"
      style={{
        ['--sidebar-width' as string]: SIDEBAR_WIDTH
      }}
    >
      <Sidebar collapsible="icon" className="absolute">
        <SidebarHeader>
          <TitleSideBar
            icon={<CodeXml />}
            title={t('apistream.name')}
            about={
              <About
                appName={t('apistream.name')}
                version={t('apistream.version')}
                author={t('apistream.author')}
                description={t('apistream.description')}
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
              {t('apistream.sidebar.labelLinks')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuApp.map((item) => (
                  <SidebarMenuItemLink
                    key={item.title}
                    title={t(`apistream.sidebar.links.${item.title}`)}
                    icon={item.icon}
                    href={item.href}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <Main />
      </main>
    </SidebarProvider>
  )
}

export default memo(SidebarApp)
