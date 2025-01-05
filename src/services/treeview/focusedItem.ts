import { getStorage, setStorage } from '@/functions/storage'
import { TreeItemIndex } from 'react-complex-tree'

export const setFocusedItem = async (
  item: TreeItemIndex,
  key: string
): Promise<void> => {
  const itemFocused = item.toString()
  await setStorage(key, itemFocused)
}

export const getFocusedItem = async (key: string): Promise<string> => {
  const dataStorage = (await getStorage(key)) || ''
  return dataStorage
}
