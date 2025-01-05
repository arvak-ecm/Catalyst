import { cn } from '@/lib/utils'
import { getCurrentWindow } from '@tauri-apps/api/window'
const appWindow = getCurrentWindow()

const IconCircleRed = (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 155 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="77.5" cy="77.5" r="77.5" fill="#DF4744" />
    <circle cx="77" cy="77" r="71" fill="#FC5753" />
    <g fill="#7E0508" className="icon hidden">
      <rect
        x="41.8701"
        y="103.388"
        width="87"
        height="11"
        transform="rotate(-45 41.8701 103.388)"
      />
      <rect
        x="41.8701"
        y="49.6482"
        width="11"
        height="87"
        transform="rotate(-45 41.8701 49.6482)"
      />
    </g>
  </svg>
)

const IconCircleYellow = (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 155 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="77.5" cy="77.5" r="77.5" fill="#DE9F34" />
    <circle cx="77" cy="77" r="71" fill="#FDBC40" />
    <rect
      className="icon hidden"
      x="34"
      y="72"
      width="87"
      height="11"
      fill="#985712"
    />
  </svg>
)

const IconCircleGreen = (
  <svg
    className="rotate-90 [&>.icon]:hover:block w-[12px] h-[12px]"
    viewBox="0 0 155 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="77.5" cy="77.5" r="77.5" fill="#27AA35" />
    <circle cx="77" cy="77" r="71" fill="#36C84B" />
    <g fill="#0B650D" className="icon hidden">
      <path d="M114.242 38.8833C114.797 38.8817 115.247 39.3317 115.245 39.8862L115.092 93.5891C115.09 94.4786 114.014 94.9223 113.385 94.2933L59.8351 40.7432C59.2061 40.1142 59.6499 39.0387 60.5394 39.0361L114.242 38.8833Z" />
      <path d="M39.8862 115.245C39.3317 115.247 38.8818 114.797 38.8833 114.242L39.0361 60.5394C39.0387 59.6499 40.1142 59.2061 40.7432 59.8351L94.2934 113.385C94.9223 114.014 94.4786 115.09 93.5891 115.092L39.8862 115.245Z" />
    </g>
  </svg>
)

const style = {
  button: 'w-[12px] h-[12px] m-0 p-0 border-none cursor-auto'
}

const MacOsSystemBar = () => {
  return (
    <div className="flex flex-row m-0 items-center gap-2 p-0">
      <button
        className={cn(style.button)}
        onClick={async () => await appWindow.close()}
      >
        {IconCircleRed}
      </button>
      <button
        className={cn(style.button)}
        onClick={async () => await appWindow.minimize()}
      >
        {IconCircleYellow}
      </button>
      <button
        className={cn(style.button)}
        onClick={async () => await appWindow.toggleMaximize()}
      >
        {IconCircleGreen}
      </button>
    </div>
  )
}

export default MacOsSystemBar
