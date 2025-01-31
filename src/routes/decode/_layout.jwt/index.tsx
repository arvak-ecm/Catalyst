import { createFileRoute } from '@tanstack/react-router'
import Panel from '@/app/decode/components/Panel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import ReactJsonView from '@microlink/react-json-view'
import TextToken from '@/components/TextToken'
import { TOKEN_VALUE } from '@/store/storeGlobal'

import { invoke } from '@tauri-apps/api/core'
import { signal } from '@preact/signals-react'
import { JwtResponse } from '@/types/jwt'

TOKEN_VALUE.value =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const Route = createFileRoute('/decode/_layout/jwt/')({
  loader: async () => {
    await handleChangeToken(TOKEN_VALUE.value)
  },
  component: () => {
    //handleChangeToken(TOKEN_VALUE.value)
    return RouteComponent()
  }
})

const header = signal<Record<string, string>>({})
const payload = signal<Record<string, string>>({})

const cleanValues = () => {
  header.value = {}
  payload.value = {}
}

const handleChangeToken = async (value: string) => {
  if (!value) {
    cleanValues()
    return
  }
  const result = (await invoke('plugin:jwt|validate', {
    token: value,
    secretKey: 'your-256-bit-secret'
  })) as JwtResponse
  if (!result.decodeBase) {
    cleanValues()
    return
  }
  header.value = result.header
  payload.value = result.payload
}
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
              <TextToken
                value={TOKEN_VALUE.value}
                onValueChange={handleChangeToken}
              />
            </div>
          </Panel>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} id="layout-tab" className="pl-2">
          <div className="flex-1 flex flex-col gap-1 justify-between h-full">
            <Panel title="Header" idAction="HEADER">
              <ReactJsonView
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                name={false}
                src={header.value}
              />
            </Panel>
            <Panel title="Payload" idAction="PAYLOAD">
              <ReactJsonView
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                name={false}
                src={payload.value}
              />
            </Panel>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
