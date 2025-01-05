import { TreeEventsEnum } from '@/data/treeEvents'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'
import { z } from 'zod'

const TreeItemIndexSchema = z.union([z.string(), z.number()])

export const treeViewStateSchema = z.object({
  selectedItems: z.array(TreeItemIndexSchema).optional(),
  expandedItems: z.array(TreeItemIndexSchema).optional(),
  focusedItem: z.string().optional()
})

//export type TreeViewStateProps = z.infer<typeof treeViewStateSchema>

export interface TreeViewStateProps {
  seletedItem?: string
  selectedItems?: TreeItemIndex[]
  expandedItems?: TreeItemIndex[]
  focusedItem?: string
}

export const dataProviderTreeSchema = z.object({
  root: z.array(
    z.object({
      data: z.string(),
      isFolder: z.boolean(),
      index: z.string(),
      children: z
        .array(
          z.object({
            data: z.string(),
            isFolder: z.boolean(),
            index: z.string()
          })
        )
        .optional()
    })
  )
})

const treeNodeSchema: z.ZodType<any> = z.object({
  data: z.string(),
  isFolder: z.boolean(),
  index: z.string(),
  children: z.array(z.lazy(() => treeNodeSchema)).optional()
})

export type TreeNodeProps = z.infer<typeof treeNodeSchema>

export const dataTreeSchema = z.object({
  root: z.array(treeNodeSchema)
})

export type DataTreeProps = z.infer<typeof dataTreeSchema>

export type DataProviderTreeProps = z.infer<typeof dataProviderTreeSchema>

const transformDataTreeSchema = z.object({
  index: z.string(),
  canMove: z.boolean(),
  isFolder: z.boolean(),
  children: z.array(z.string()).optional(),
  data: z.string(),
  canRename: z.boolean()
})

export type TransformedDataTreeProps = z.infer<typeof transformDataTreeSchema>

export interface NodeItemTreeProps {
  data: string
  isFolder: boolean
  index: string
  children?: NodeItemTreeProps[]
}

export interface RootTreeProps {
  name: string
  data: string
  isFolder: boolean
  children: NodeItemTreeProps[]
}

export interface TreeItemEvent extends TreeItem {
  event?: TreeEventsEnum
}

export interface TreeViewDataProps {
  dataProvider: Record<TreeItemIndex, TreeItem<any>>
  selectedItems: TreeItemIndex[]
  focusedItem: TreeItem<string>
  expandedItems: TreeItemIndex[]
}
