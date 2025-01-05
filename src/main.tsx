import './index.css'

import ReactDOM from 'react-dom/client'
import { AppConfigProps } from '@/types/application'
import { initializeAppState } from '@/initialize_app/initializeAppState'
import { createRouter } from '@/router'
import { AppProvider } from '@/context/appContext'
import { RouterProvider } from '@tanstack/react-router'

const router = createRouter()
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const basePath = '/'

initializeAppState()
  .then(async (query: AppConfigProps) => {
    const rootElement = document.getElementById('root')!
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement)
      root.render(
        /* <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >*/
        <AppProvider theme={query.theme} os={query.os} locale={query.locale}>
          <RouterProvider router={router} basepath={basePath} />
          {/* <AnimatedRouter router={router} basePath="/" /> */}
        </AppProvider>
        /* </PersistQueryClientProvider>*/
      )
    }
  })
  .catch(console.error)
