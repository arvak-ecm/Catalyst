import { NodeApi, NodeRendererProps, Tree, useSimpleTree } from 'react-arborist'
import '@/styles/tree.css'
import { Folder, FolderOpen } from 'lucide-react'
const dataDemo = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      { id: 'c1', name: 'General' },
      { id: 'c2', name: 'Random' },
      { id: 'c3', name: 'Open Source Projects' }
    ]
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      { id: 'd1', name: 'Alice' },
      { id: 'd2', name: 'Bob' },
      { id: 'd3', name: 'Charlie' }
    ]
  }
]

const FolderTree = ({
  isOpen,
  node
}: {
  isOpen: boolean
  node: NodeApi<any>
}) => {
  return (
    <span className="pr-1" onClick={() => node.toggle()}>
      {isOpen ? (
        <FolderOpen className="w-4 h-4 fill-icon-active-open relative" />
      ) : (
        <Folder className="w-4 h-4 fill-icon-active" />
      )}
    </span>
  )
}

function InputEdit({ node }: { node: NodeApi<any> }) {
  return (
    <form>
      <label htmlFor="edit" className="sr-only">
        edit
      </label>
      <input
        id="edit"
        className="text-sm rounded-sm border border-primary p-0 ring-0 focus:outline-hidden focus:ring-0"
        autoFocus
        type="text"
        defaultValue={node.data.name}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={() => node.reset()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') node.reset()
          if (e.key === 'Enter') node.submit(e.currentTarget.value)
        }}
      />
    </form>
  )
}

function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div className="tree-app text-sm" style={style} ref={dragHandle}>
      {node.isLeaf ? '' : <FolderTree node={node} isOpen={node.isOpen} />}{' '}
      <span>{node.isEditing ? <InputEdit node={node} /> : node.data.name}</span>
    </div>
  )
}

const TreeViewNative = () => {
  console.log(`🚀 ======== TreeViewNative ======== 🚀`)
  const [data, controller] = useSimpleTree(dataDemo)

  return (
    <Tree
      width={'100%'}
      data={data}
      selection="d2"
      disableMultiSelection={true}
      onSelect={(node: NodeApi<any>[]) => {
        const selectItem = node[0].data
        const isFolder = node[0].data.children?.length > 0
        console.log('onSelect', selectItem, isFolder)
      }}
      {...controller}
    >
      {Node}
    </Tree>
  )
}

export default TreeViewNative
