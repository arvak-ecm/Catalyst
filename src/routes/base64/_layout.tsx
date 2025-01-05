import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/base64/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/base64/_layout"!</div>
}
