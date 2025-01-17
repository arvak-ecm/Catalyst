import { createLazyFileRoute } from '@tanstack/react-router'
import Panel from '@/app/decode/components/Panel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import TextToken from '@/components/TextToken'
import { TOKEN_VALUE } from '@/store/storeGlobal'

TOKEN_VALUE.value =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const Route = createLazyFileRoute('/decode/_layout/jwt/')({
  component: RouteComponent
})
function RouteComponent() {
  console.log(`🚀 ======== ROUTE LAYOUT JWT ======== 🚀`)

  return (
    <div className="flex-1 h-full flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-2">
        <h2 className="">Jwt Decode Tool</h2>
        <div>Decode a JWT token into its component parts.</div>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={35} defaultSize={50} className="pr-2">
          <Panel title="JSON Web Token (JWT)" idAction="JWT">
            <div className="relative w-full h-full">
              <TextToken value={TOKEN_VALUE.value} />
            </div>
          </Panel>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} id="layout-tab" className="pl-2">
          <div className="flex-1 flex flex-col gap-1 justify-between h-full">
            <Panel title="Header" idAction="HEADER">
              header
            </Panel>
            <Panel title="Payload" idAction="PAYLOAD">
              payload
            </Panel>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
