import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Copy, Trash } from 'lucide-react'

export const Route = createLazyFileRoute('/decode/_layout/jwt/')({
  component: RouteComponent
})

const Styles = {
  container: 'w-[50%] rounded-sm border p-1'
}

function RouteComponent() {
  return (
    <div className="flex-1 h-full flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-2">
        <h2 className="">Jwt Decode Tool</h2>
        <div>Decode a JWT token into its component parts.</div>
      </div>
      <div className="flex flex-row gap-1 h-full justify-between">
        <Card className="w-full h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              JSON Web Token (JWT)
              <div className="flex flex-row ml-auto gap-1">
                <Trash className="w-4 h-4" />
                <Copy className="w-4 h-4" />
              </div>
            </CardTitle>
            <CardDescription>sdad</CardDescription>
          </CardHeader>
          <CardContent>asdd</CardContent>
          <CardFooter className="mt-auto items-center">sdadsd</CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>JSON Web Token (JWT)</CardTitle>
            <CardDescription>sdad</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
