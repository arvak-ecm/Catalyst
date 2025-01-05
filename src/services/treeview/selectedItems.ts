import { getStorage, setStorage } from '@/functions/storage'
import { TreeItemIndex } from 'react-complex-tree'

export const setSelectedItems = async (
  items: TreeItemIndex[],
  key: string
): Promise<void> => {
  await setStorage(key, JSON.stringify(items))
}

export const getSelectedItems = async (
  key: string
): Promise<TreeItemIndex[]> => {
  const dataStorage = await getStorage(key)
  return JSON.parse(dataStorage || '[]')
}
