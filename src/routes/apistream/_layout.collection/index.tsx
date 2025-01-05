import { createFileRoute } from '@tanstack/react-router'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'
import { TreeViewServices } from '@/services/treeView.service'
import {
  dataProvider,
  expandedItems,
  focusedItem,
  selectedItems,
  treeviewItemFocused
} from '@/store/treeview'
import { ScrollArea } from '@/components/ui/scroll-area'
import TreeView from '@/components/treeview/TreeView'
import { APISTREAM_CONFIG } from '@/data/enviromentVars'
import SubMenuItemTreeView from '@/app/apistream/SubMenuItemTreeView'

const fetchInitialData = async () => {
  const service = new TreeViewServices('APISTREAM', 'COLLECTIONS')
  const data = await service.getAllData()
  console.log(data.dataProvider)
  dataProvider.value = data.dataProvider
  selectedItems.value = data.selectedItems as TreeItemIndex[]
  focusedItem.value = data.focusedItem as TreeItem<string>
  expandedItems.value = data.expandedItems as TreeItemIndex[]
  treeviewItemFocused.value = data.focusedItem as TreeItem<string>
}

export const Route = createFileRoute('/apistream/_layout/collection/')({
  beforeLoad: async () => {
    await fetchInitialData()
  },
  component: RouteComponent
})

function RouteComponent() {
  console.log(`🚀 ======== COLLECTIONS ======== 🚀`)
  return (
    <div id="container-collections" className="flex-1 h-full overflow-hidden">
      <div className="">hola</div>
      <ScrollArea className="h-[calc(100%-25px)]">
        <TreeView
          dbKey="APISTREAM"
          tableKey="COLLECTIONS"
          treeId={APISTREAM_CONFIG.collections.idTree}
          SubMenuItemComponent={(props) => <SubMenuItemTreeView {...props} />}
        />
      </ScrollArea>
    </div>
  )
}
