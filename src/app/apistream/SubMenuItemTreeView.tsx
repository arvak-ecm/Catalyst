import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import { TreeEventsEnum } from '@/data/treeEvents'
import { memo } from 'react'
import { TreeItem } from 'react-complex-tree'

interface props {
  id: TreeItem<string>
  onClickEventSubMenu: (event: TreeEventsEnum, item: TreeItem<string>) => void
}

const SubMenuItemTreeView = ({ id, onClickEventSubMenu }: props) => {
  console.log(`🚀 ======== SubMenuItemTreeView ======== 🚀`)
  return (
    <>
      <DropdownMenuGroup>
        {id?.isFolder && (
          <>
            <DropdownMenuItem
              onClick={() => onClickEventSubMenu(TreeEventsEnum.ADD_FOLDER, id)}
            >
              Add folder
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onClickEventSubMenu(TreeEventsEnum.ADD_ITEM, id)}
            >
              Add Item
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem
          onClick={() => onClickEventSubMenu(TreeEventsEnum.RENAME_ITEM, id)}
        >
          Rename
          <DropdownMenuShortcut>f2</DropdownMenuShortcut>
        </DropdownMenuItem>
        {!id?.isFolder && (
          <DropdownMenuItem
            onClick={() =>
              onClickEventSubMenu(TreeEventsEnum.DUPLICATE_ITEM, id)
            }
          >
            Duplicate
            <DropdownMenuShortcut>ctrl+d</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => onClickEventSubMenu(TreeEventsEnum.REMOVE_ITEM, id)}
        >
          Remove
          <DropdownMenuShortcut>del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

export default memo(SubMenuItemTreeView)
