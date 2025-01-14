import SideBarBase from '@/features/SideBarBase'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { isOpenSideBar } from '@/store/storeGlobal'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/decode/_layout')({
  beforeLoad: async () => {
    const store = IDBFactoryKeyVal.getInstance('DECODE', 'GLOBALS')
    isOpenSideBar.value = (await store!.get<boolean>(
      'IS_OPEN_SIDEBAR'
    )) as boolean
  },
  component: RouteComponent
})

const menu = [
  {
    title: 'base64',
    icon: <></>,
    href: '/decode/base64'
  },
  {
    title: 'jwt',
    icon: <></>,
    href: '/decode/jwt'
  }
]

function RouteComponent() {
  return (
    <div className="flex-1 h-full">
      <SideBarBase>
        <SideBarBase.Menu
          dbName="DECODE"
          tableName="GLOBALS"
          i18n="decode"
          menu={menu}
          iconApp={<></>}
        />
        <SideBarBase.Content>
          <Outlet />
        </SideBarBase.Content>
      </SideBarBase>
    </div>
  )
}
