import { getFileResources } from '@/functions/getFileResources'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { TreeViewServices } from '@/services/treeView.service'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'

const defaultGlobalState = {
  PANEL_OULET_SIZE: 30,
  IS_OPEN_SIDEBAR: true
}

const setDefaultGlobalState = async () => {
  const storeGlobals = IDBFactoryKeyVal.getInstance('APISTREAM', 'GLOBALS')

  if (!storeGlobals) {
    throw new Error('storeGlobals is undefined')
  }
  const panelSize = await storeGlobals.get<number>('PANEL_OULET_SIZE')
  if (panelSize === undefined) {
    await storeGlobals.set(
      'PANEL_OULET_SIZE',
      defaultGlobalState.PANEL_OULET_SIZE
    )
    await storeGlobals.set(
      'IS_OPEN_SIDEBAR',
      defaultGlobalState.IS_OPEN_SIDEBAR
    )
  }
}

const setDefaultTree = async () => {
  const srv = new TreeViewServices('APISTREAM', 'COLLECTIONS')
  const dataProvider = await srv.getDataProvider()
  if (dataProvider === undefined) {
    const file = (await getFileResources(
      'resources/defaultdata/treeview.json',
      'json'
    )) as {
      treeViewFull: {
        focusedItem: TreeItem<string> | undefined
        expandedItems: string[]
        selectedItems: TreeItemIndex[] | undefined
        dataProvider: Record<TreeItemIndex, TreeItem<any>>
      }
    }
    const defaultData = file.treeViewFull.dataProvider
    await srv.setDataProvider(defaultData)
    await srv.setFocusedItem(file.treeViewFull.focusedItem)
    await srv.setExpandedItemDefault(file.treeViewFull.expandedItems)
    await srv.setSelectedItems(file.treeViewFull.selectedItems)
  }
}

export const initializeApiStream = async () => {
  await Promise.all([setDefaultGlobalState(), setDefaultTree()])
}
