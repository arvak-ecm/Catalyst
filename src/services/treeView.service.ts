import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { TreeViewDataProps } from '@/types/treeView'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'

export class TreeViewServices extends IDBFactoryKeyVal {
  constructor(dbName: string, storeName: string) {
    super(dbName, storeName)
  }

  // Métodos personalizados
  async getDataProvider<T>(): Promise<T> {
    return (await this.get<T>('DATAPROVIDER')) as T
  }

  async getFocusedItem<T>(): Promise<T> {
    return (await this.get<T>('FOCUSEDITEM')) as T
  }

  async getExpandedItems<T>(): Promise<T> {
    return (await this.get<T>('EXPANDEDITEMS')) as T
  }

  async getSelectedItems<T>(): Promise<T> {
    return (await this.get<T>('SELECTEDITEMS')) as T
  }

  async setFocusedItem(item: TreeItem<string> | undefined): Promise<void> {
    if (item === undefined) return
    await this.set('FOCUSEDITEM', item)
  }

  async setSelectedItems(items: TreeItemIndex[] | undefined): Promise<void> {
    if (items === undefined) return
    await this.set('SELECTEDITEMS', items)
  }

  async setDataProvider(data: Record<string, any>): Promise<void> {
    await this.set('DATAPROVIDER', data)
  }

  async setExpandedItem(
    item: TreeItem<string>,
    state: 'expanded' | 'collapsed'
  ): Promise<void> {
    const items = (await this.get<string[]>('EXPANDEDITEMS')) || []
    const index = item.index as string
    const existItem = items.indexOf(index) !== -1

    if (state === 'collapsed' && existItem) {
      items.splice(items.indexOf(index), 1)
    } else if (state === 'expanded' && !existItem) {
      items.push(index)
    }

    await this.set('EXPANDEDITEMS', items)
  }

  async setExpandedItemDefault(items: string[]): Promise<void> {
    await this.set('EXPANDEDITEMS', items)
  }

  async getAllData(): Promise<TreeViewDataProps> {
    const [dataProvider, selectedItems, focusedItem, expandedItems] =
      await Promise.all([
        this.getDataProvider<Record<TreeItemIndex, TreeItem<any>>>(),
        this.getSelectedItems<TreeItemIndex[]>(),
        this.getFocusedItem<TreeItem<string>>(),
        this.getExpandedItems<TreeItemIndex[]>()
      ])
    return {
      dataProvider,
      selectedItems,
      focusedItem,
      expandedItems
    }
  }
}
