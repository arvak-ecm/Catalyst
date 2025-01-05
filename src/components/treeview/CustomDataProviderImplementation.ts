import { getuuId } from '@/functions/getId'
import {
  Disposable,
  TreeDataProvider,
  TreeItem,
  TreeItemIndex
} from 'react-complex-tree/lib/esm/types'

export class CustomDataProviderImplementation implements TreeDataProvider {
  private data: Record<TreeItemIndex, TreeItem>
  constructor(items: Record<TreeItemIndex, TreeItem<any>>) {
    this.data = { ...items }
  }

  private treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] =
    []

  async addItem(item: TreeItem, parentIndex: string): Promise<void> {
    this.data[item.index] = item
    this.data[parentIndex].children?.push(item.index)
  }

  async removeItem(item: TreeItem): Promise<TreeItem> {
    const parentItem = await this.findParentByChildId(item.index as string)
    this.data[parentItem].children?.splice(
      this.data[parentItem].children?.indexOf(item.index) as number,
      1
    )
    delete this.data[item.index]
    this.refreshTreeData()
    return this.data[parentItem]
  }
  async newItem(
    item: TreeItem,
    isFolder: boolean,
    isRoot: boolean
  ): Promise<TreeItem> {
    const parentItem = isRoot
      ? await this.findParentByChildId(item.index as string)
      : item.index
    const newItem: TreeItem = {
      index: getuuId(),
      data: 'New Item',
      isFolder: isFolder,
      children: [],
      canMove: true,
      canRename: true
    }
    await this.addItem(newItem, parentItem as string)
    this.refreshTreeData()
    return newItem
  }

  async getTreeItem(itemId: TreeItemIndex): Promise<TreeItem> {
    return this.data[itemId]
  }
  async getItems() {
    return this.data
  }

  refreshTreeData() {
    this.treeChangeListeners.forEach((listener) => listener(['root']))
  }

  async duplicateItem(item: TreeItem): Promise<TreeItem> {
    const copyItem = { ...item }
    const parentItem = await this.findParentByChildId(copyItem.index as string)
    const newItem: TreeItem = {
      index: getuuId(),
      data: copyItem.data,
      isFolder: copyItem.isFolder,
      children: [],
      canMove: true,
      canRename: true
    }
    await this.addItem(newItem, parentItem as string)
    this.refreshTreeData()
    return newItem
  }

  async findParentByChildId(itemId: string): Promise<TreeItemIndex> {
    return (
      Object.values(this.data).find(
        (item) => item.isFolder && item.children?.includes(itemId)
      )?.index ?? this.data['root'].index
    )
  }

  async onChangeItemChildren(
    itemId: TreeItemIndex,
    newChildren: TreeItemIndex[]
  ) {
    this.data[itemId].children = newChildren
    this.treeChangeListeners.forEach((listener: any) => listener([itemId]))
  }
  async onRenameItem(item: TreeItem<any>, name: string) {
    this.data[item.index].data = name
  }
  onDidChangeTreeData(
    listener: (changedItemIds: TreeItemIndex[]) => void
  ): Disposable {
    this.treeChangeListeners.push(listener)
    return {
      dispose: () =>
        this.treeChangeListeners.splice(
          this.treeChangeListeners.indexOf(listener),
          1
        )
    }
  }
}
