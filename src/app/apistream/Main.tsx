import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import ContainerItems from './containerItems'
import { debounce } from '@/functions/debounce'
import { memo, useCallback } from 'react'
import { panelSize } from '@/store/storeGlobal'
import { useStore } from '@/hooks/useStore'
import { Outlet } from '@tanstack/react-router'
const Main = () => {
  console.log(`🚀 ======== MAIN ======== 🚀`)
  const store = useStore('APISTREAM', 'GLOBALS')
  const handleResize = (value: number) => {
    store.set<number>('PANEL_OULET_SIZE', value)
  }

  const debouncedHandleResize = useCallback(debounce(handleResize, 500), [
    handleResize
  ])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={panelSize.value}
        id="layout-outlet"
        onResize={(size: number) => {
          debouncedHandleResize(size)
        }}
        className="flex-1 flex flex-col gap-2 h-full overflow-hidden"
      >
        <Outlet />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={40} id="layout-tab" className="bg-background">
        <ContainerItems />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default memo(Main)
