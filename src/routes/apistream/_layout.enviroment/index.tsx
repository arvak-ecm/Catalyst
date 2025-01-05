import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apistream/_layout/enviroment/')({
  component: RouteComponent
})

function RouteComponent() {
  console.log(`🚀 ======== ENVIROMENT ======== 🚀`)
  return (
    <div className="relative flex-1 bg-red-300 w-auto">
      Hello "/curls/_layout/enviroment/"!
    </div>
  )
}
