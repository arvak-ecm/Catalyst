import { setStorage } from '@/functions/storage'
import { TreeViewStateProps } from '@/types/treeView'

export const setViewState = async (
  key: string,
  state: TreeViewStateProps
): Promise<void> => {
  await setStorage(key, JSON.stringify(state))
}
