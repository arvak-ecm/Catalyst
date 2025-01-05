import Footer from '@/components/footer'
import { createFileRoute } from '@tanstack/react-router'
import SidebarApp from '@/app/apistream/Sidebar'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { panelSize, isOpenSideBar } from '@/store/storeGlobal'

export const Route = createFileRoute('/apistream/_layout')({
  beforeLoad: async () => {
    const store = IDBFactoryKeyVal.getInstance('APISTREAM', 'GLOBALS')
    panelSize.value = (await store!.get<number>('PANEL_OULET_SIZE')) as number
    isOpenSideBar.value = (await store!.get<boolean>(
      'IS_OPEN_SIDEBAR'
    )) as boolean
  },
  component: RouteComponent
})

function RouteComponent() {
  console.log(`🚀 ======== ApiStream ======== 🚀`)
  return (
    <div className="flex-1 grid grid-rows-[1fr_var(--layout-footer-height)] h-full">
      <div className="flex-1 h-full overflow-hidden">
        <SidebarApp />
      </div>
      <Footer>saddadd</Footer>
    </div>
  )
}
