import { useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'

const IconMinimize = (
  <svg width="10" height="10" viewBox="0 0 10 1" fill="currentColor">
    <path d="M0 0h10v1H0z" />
  </svg>
)

const IconMaximize = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M0 0v10h10V0H0zm1 1h8v8H1V1z" />
  </svg>
)

const IconRestore = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M2 0v2H0v8h8V8h2V0H2zm5 9H1V3h6v6zm2-2H8V2H3V1h6v6z" />
  </svg>
)

const IconClose = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M6.4 5l3.3-3.3-.9-.9L5.5 4.1 2.2.8l-.9.9 3.3 3.3L1.3 8.3l.9.9 3.3-3.3 3.3 3.3.9-.9L6.4 5z" />
  </svg>
)

const appWindow = getCurrentWindow()

const WindowsSystemBar = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div className="flex flex-row items-center justify-end h-full">
      <button
        onClick={() => appWindow.minimize()}
        className="flex items-center justify-center w-11 h-full text-gray-600 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
        aria-label="Minimize"
      >
        {IconMinimize}
      </button>
      <button
        onClick={async () => {
          appWindow.toggleMaximize()
          setIsMaximized(await appWindow.isMaximized())
        }}
        className="flex items-center justify-center w-11 h-full text-gray-600 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
        aria-label={isMaximized ? 'Restore' : 'Maximize'}
      >
        {isMaximized ? IconMaximize : IconRestore}
      </button>
      <button
        onClick={() => appWindow.close()}
        className="flex items-center justify-center w-11 h-full text-gray-600 hover:bg-red-500 hover:text-white focus:outline-none transition-colors duration-200"
        aria-label="Close"
      >
        {IconClose}
      </button>
    </div>
  )
}

export default WindowsSystemBar
