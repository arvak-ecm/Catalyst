import { Folder, FolderOpen } from 'lucide-react'
import { TreeItem, TreeItemRenderContext } from 'react-complex-tree'

interface props {
  item: TreeItem<string>
  context: TreeItemRenderContext<never>
}

const Expanded = ({ item, context }: props) => {
  return item.isFolder ? (
    <div
      className="cursor-pointer"
      onClick={() => {
        if (context.isExpanded) {
          context.collapseItem()
          return
        }
        context.expandItem()
      }}
    >
      {context.isExpanded ? (
        <FolderOpen className="w-4 h-4 fill-icon-active-open relative z-5" />
      ) : (
        <Folder className="w-4 h-4 fill-icon-active" />
      )}
    </div>
  ) : null
}

export default Expanded
