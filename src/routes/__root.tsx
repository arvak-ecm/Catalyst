import { createRootRoute, Outlet } from '@tanstack/react-router'
import TitleBar from '@/features/TitleBar'
import MacOsSystemBar from '@/features/macosSystem'
import WindowsSystemBar from '@/features/windowsSystem'
import NavigationApp from '@/features/navigationApp'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { AppContext } from '@/context/appContext'
import { use } from 'react'
import useIsResizing from '@/hooks/useIsResizing'
import { cn } from '@/lib/utils'
i18n
  .use(Backend)
  //.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

const RootComponent = () => {
  const context = use(AppContext)
  const isResizing = useIsResizing()

  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <>
        <div
          className={cn(
            'absolute h-screen w-screen top-0 left-0 backdrop-blur-xs bg-transparent z-50 transition-opacity duration-custom ease-in-out',
            isResizing
              ? 'opacity-80 bg-primary/60 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        ></div>
        <div className="grid grid-rows-[var(--layout-header-height)_1fr] h-screen rounded-xl bg-main border-accent-foreground/10 w-screen">
          <TitleBar>
            {context?.os === 'macos' && <MacOsSystemBar />}
            <div
              data-drag
              data-dblclick
              className="flex justify-between items-center w-full pl-2"
            >
              <div>Logo</div>
              <div className="flex flex-row gap-2 items-center">
                <NavigationApp />
              </div>
            </div>
            {context?.os === 'windows' && <WindowsSystemBar />}
          </TitleBar>
          <main className="flex-1 border-l border-r border-panel-border border-b overflow-hidden">
            {/* <AnimatedOutlet /> */}
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </main>
        </div>
      </>
    </I18nextProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
