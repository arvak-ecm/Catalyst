import ApiChartPage from '@/app/apichart/apichart_page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/apichart/')({
  component: ApiChartPage
})

function RouteComponent() {
  return <div>Hello "/apichart/"!</div>
}
