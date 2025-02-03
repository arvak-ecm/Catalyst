import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import Panel from './components/Panel'
import TextToken from '@/components/TextToken'
import { TOKEN_VALUE } from '@/store/storeGlobal'
import ReactJsonView from '@microlink/react-json-view'
import { JwtResponse } from '@/types/jwt'
import { invoke } from '@tauri-apps/api/core'
import { signal } from '@preact/signals-react'

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
const JwtPage = () => {
  return (
    <div className="flex-1 h-full flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-2">
        <h2 className="">Jwt Decode Tool</h2>
        <div className="flex flex-row">
          <div>Decode a JWT token into its component parts.</div>
          <div className="ml-auto">swift</div>
        </div>
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

export default JwtPage
