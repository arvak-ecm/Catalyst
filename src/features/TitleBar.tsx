import { getCurrentWindow } from '@tauri-apps/api/window'
import { cn } from '@/lib/utils'
import { MouseEvent, use } from 'react'
import { AppContext } from '@/context/appContext'
const appWindow = getCurrentWindow()

interface TitleBarProps {
  className?: string
  children?: React.ReactNode
}

const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement
  if (target.dataset.drag) {
    appWindow.startDragging()
    return
  }
  //if (target !== headerRef.current) return;
  //appWindow.startDragging();
}

const handleDblClick = (event: MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement
  if (target.dataset.dblclick) {
    appWindow.toggleMaximize()
    return
  }
  //if (target !== headerRef.current) return;
  //appWindow.toggleMaximize();
}

const Styles = {
  mac: 'flex justify-between items-center px-2 overflow-hidden h-[--layout-header-height] border bg-primary border-primary transition-colors rounded-tl-lg rounded-tr-lg',
  win: 'flex justify-between items-center  overflow-hidden h-[--layout-header-height] border bg-primary border-primary transition-colors rounded-tl-lg rounded-tr-lg'
}

const TitleBar = ({ className, children }: TitleBarProps) => {
  const context = use(AppContext)
  return (
    <header
      data-drag
      data-dblclick
      className={cn(
        className,
        context?.os === 'macos' ? Styles.mac : Styles.win
      )}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDblClick}
    >
      {children}
    </header>
  )
}

export default TitleBar
