import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/decode/_layout/base64/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/decode/_layout/base64/"!</div>
}
