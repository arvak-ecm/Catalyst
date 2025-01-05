import { signal } from '@preact/signals-react'
import { TreeItem, TreeItemIndex } from 'react-complex-tree/lib/esm/types'

export const treeviewItemFocused = signal<TreeItem<string>>()
export const dataProvider = signal<Record<TreeItemIndex, TreeItem<any>>>()
export const selectedItems = signal<TreeItemIndex[]>([])
export const focusedItem = signal<TreeItem<string>>()
export const expandedItems = signal<TreeItemIndex[]>([])
