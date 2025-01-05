import '@/styles/rct.css'
import '@/styles/rct-modern.css'
import '@/styles/rct-custom.css'

import {
  InteractionMode,
  Tree,
  TreeEnvironmentRef,
  TreeItem,
  TreeItemIndex,
  TreeRef,
  UncontrolledTreeEnvironment
} from 'react-complex-tree'
import { memo, useCallback, useMemo, useRef } from 'react'
import Item from './Item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'
import Expanded from './Expanded'
import { TreeViewServices } from '@/services/treeView.service'
import { TreeEventsEnum } from '@/data/treeEvents'
import {
  dataProvider as dataProviderStore,
  treeviewItemFocused as treeviewItemFocusedStore,
  expandedItems as expandedItemsStore,
  selectedItems as selectedItemsStore,
  focusedItem as focusedItemStore
} from '@/store/treeview'
import { CustomDataProviderImplementation } from './CustomDataProviderImplementation'
const handleFocusRenamingInput = () => {
  setTimeout(() => {
    const input = document.querySelector<HTMLInputElement>(
      '.rct-tree-item-renaming-input'
    )
    if (input) {
      input.focus()
      input.select()
    }
  }, 100)
}

interface props {
  dbKey: string
  tableKey: string
  treeId: string
  SubMenuItemComponent?: React.ElementType<{
    id: TreeItem<string>
    onClickEventSubMenu: (event: any, id: TreeItem<string>) => void
  }>
}

const TreeView = ({ dbKey, tableKey, treeId, SubMenuItemComponent }: props) => {
  console.log(`🚀 ======== TreeView ======== 🚀`)
  const items = useMemo(() => ({ ...dataProviderStore.value }), [])
  const service = new TreeViewServices(dbKey, tableKey)
  const treeEnvironmentRef = useRef<TreeEnvironmentRef<string>>(null)
  const treeRef = useRef<TreeRef>(null)

  const saveDataProvider = {
    mutationFn: async () => {
      const data = await dataProvider.getItems()
      await service.setDataProvider(data)
    }
  }

  const handleOpenFolder = (item: TreeItem<string>) => {
    const isFolder = item.isFolder
    if (!isFolder) return
    treeRef.current?.expandItem(item.index)
  }

  const onEventEnd = async (item: TreeItem<string>) => {
    setTimeout(() => {
      treeRef.current?.selectItems([item.index])
      treeRef.current?.focusItem(item.index, true)
      treeEnvironmentRef.current?.viewState.expandedItems?.expandedItems?.push(
        item.index
      )
    }, 100)
    saveDataProvider.mutationFn()
  }

  const dataProvider = useMemo(
    () =>
      //new StaticTreeDataProvider(items, (item, data) => ({ ...item, data })),

      new CustomDataProviderImplementation(items),
    [items]
  )

  const viewStateTree = useMemo(
    () => ({
      ...{
        [treeId]: {
          focusedItem: focusedItemStore.value?.index,
          expandedItems: expandedItemsStore.value,
          selectedItems: selectedItemsStore.value
        }
      }
    }),
    [focusedItemStore.value, expandedItemsStore.value, selectedItemsStore.value]
  )

  const handleTreeEvent = useCallback(
    async (id: TreeEventsEnum, item: TreeItem<string>) => {
      //const item = { ...eventTree } as TreeItem
      switch (id) {
        case TreeEventsEnum.REMOVE_ITEM: {
          const removedItem = await dataProvider.removeItem(item)
          onEventEnd(removedItem)
          break
        }
        case TreeEventsEnum.RENAME_ITEM: {
          treeRef?.current?.startRenamingItem(item.index)
          handleFocusRenamingInput()
          break
        }
        case TreeEventsEnum.DUPLICATE_ITEM: {
          if (!item.isFolder) {
            const duplicatedItem = await dataProvider.duplicateItem(item)
            onEventEnd(duplicatedItem)
          }
          break
        }
        case TreeEventsEnum.ADD_ITEM: {
          handleOpenFolder(item)
          const newItem = await dataProvider.newItem(item, false, false)
          onEventEnd(newItem)
          break
        }
        case TreeEventsEnum.ADD_FOLDER: {
          handleOpenFolder(item)
          const newFolder = await dataProvider.newItem(item, true, false)
          onEventEnd(newFolder)
          break
        }
        default:
          console.log(`🚀 ======== DEFAULT-TREEVIEW-EVENT ======== 🚀`)
          break
      }
    },
    [dataProvider, onEventEnd, treeRef, handleOpenFolder]
  )
  return (
    <div className="flex-1 h-full w-full">
      <UncontrolledTreeEnvironment<string>
        ref={treeEnvironmentRef as any}
        defaultInteractionMode={InteractionMode.ClickArrowToExpand}
        canDragAndDrop
        canReorderItems
        canDropOnFolder
        canDropOnNonFolder
        canSearch
        canRename
        dataProvider={dataProvider}
        getItemTitle={(item) => item.data}
        viewState={viewStateTree}
        onDrop={saveDataProvider.mutationFn}
        onRenameItem={saveDataProvider.mutationFn}
        onFocusItem={(item: TreeItem<string>) => {
          service.setFocusedItem(item)
          treeviewItemFocusedStore.value = item
        }}
        onSelectItems={(items: TreeItemIndex[]) => {
          service.setSelectedItems(items)
        }}
        onExpandItem={(item: TreeItem<string>) => {
          service.setExpandedItem(item, 'expanded')
        }}
        onCollapseItem={(item: TreeItem<string>) => {
          service.setExpandedItem(item, 'collapsed')
        }}
        //onRenameItem={onRenameItem}
        renderItem={({ item, title, arrow, context, children, depth }) => {
          return (
            <li
              {...context.itemContainerWithChildrenProps}
              className="pl-[16px]"
            >
              <div className="ITEM flex flex-row justify-center">
                <Item
                  key={`item-${item.index}`}
                  depth={depth}
                  title={title}
                  arrow={arrow}
                  context={context}
                />
                {SubMenuItemComponent && (
                  <DropdownMenu key={`dropdown-${item.index}`}>
                    <DropdownMenuTrigger asChild>
                      <div
                        className={cn(
                          'options ml-auto rounded-sm hover:text-primary p-1 absolute right-1 cursor-pointer pt-[0.47rem] z-10',
                          context.isFocused ? 'flex' : 'hidden'
                        )}
                      >
                        <Ellipsis className="w-4 h-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <SubMenuItemComponent
                        key={`Submenu-${item.index}`}
                        id={treeviewItemFocusedStore.value as TreeItem<string>}
                        onClickEventSubMenu={handleTreeEvent}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              {children}
            </li>
          )
        }}
        renderItemArrow={({ item, context }) => (
          <Expanded item={item} context={context} />
        )}
      >
        <Tree
          treeId={treeId}
          rootItem="root"
          treeLabel={treeId}
          ref={treeRef as any}
        />
      </UncontrolledTreeEnvironment>
    </div>
  )
}

export default memo(TreeView)
