import {
  NodeItemTreeProps,
  RootTreeProps,
  TreeNodeProps
} from '@/types/treeView'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'

export function transformDataProviderTree(input: { root: RootTreeProps }): {
  items: Record<TreeItemIndex, TreeItem<any>>
} {
  const items: Record<TreeItemIndex, TreeItem<any>> = {}

  //Record<string, TransformedDataTreeProps> = {}
  items['root'] = {
    index: input.root.name,
    canMove: false,
    isFolder: true,
    children: input.root.children.map((item) => item.index),
    data: input.root.data,
    canRename: false
  }
  function traverse(node: NodeItemTreeProps, _parentIndex?: string): void {
    const children = node.children
      ? node.children.map((child: TreeNodeProps) => child.index)
      : undefined

    items[node.index] = {
      index: node.index,
      canMove: true,
      isFolder: node.isFolder,
      children: children,
      data: node.data,
      canRename: true
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child, node.data)
      }
    }
  }

  input.root.children.forEach((item) => traverse(item))

  return { items }
}
