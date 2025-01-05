import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { createRouter as createReactRouter } from '@tanstack/react-router'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 60 * 1000
    }
  }
})

export function createRouter() {
  return createReactRouter({
    routeTree,
    context: {
      queryClient: queryClient
    },
    //defaultPendingComponent: () => <Loader title="Loading..." />,
    //defaultErrorComponent: ({ error }) => <OnError error={error.message} />,
    //defaultNotFoundComponent: ({ data }: NotFoundError) => (
    //  <NotFound data={data} />
    //),
    defaultPreload: false,
    defaultPreloadStaleTime: 5000
    //transformer: SuperJSON
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
