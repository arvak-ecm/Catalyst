import { getStorage, setStorage } from '@/functions/storage'
import { queryOptions } from '@tanstack/react-query'
import { TreeItem, TreeItemIndex } from 'react-complex-tree'

const DATA_SAMPLE = {
  root: {
    index: 'root',
    canMove: false,
    isFolder: true,
    children: [
      'f9012090-b3c3-11ef-8e8a-1594277974d2',
      'f9012093-b3c3-11ef-8e8a-1594277974d2'
    ],
    data: 'root',
    canRename: false
  },
  'f9012090-b3c3-11ef-8e8a-1594277974d2': {
    index: 'f9012090-b3c3-11ef-8e8a-1594277974d2',
    canMove: true,
    isFolder: true,
    children: [
      'f9012091-b3c3-11ef-8e8a-1594277974d2',
      'f9012092-b3c3-11ef-8e8a-1594277974d2'
    ],
    data: 'Folder Example',
    canRename: true
  },
  'f9012091-b3c3-11ef-8e8a-1594277974d2': {
    index: 'f9012091-b3c3-11ef-8e8a-1594277974d2',
    canMove: true,
    isFolder: false,
    data: 'Curl Example 1',
    canRename: true
  },
  'f9012092-b3c3-11ef-8e8a-1594277974d2': {
    index: 'f9012092-b3c3-11ef-8e8a-1594277974d2',
    canMove: true,
    isFolder: false,
    data: 'Curl Example 2',
    canRename: true
  },
  'f9012093-b3c3-11ef-8e8a-1594277974d2': {
    index: 'f9012093-b3c3-11ef-8e8a-1594277974d2',
    canMove: true,
    isFolder: false,
    data: 'Curl Example 3',
    canRename: true
  }
}

export const getDataProviderQueryOptions = (key: string) => {
  return queryOptions({
    queryKey: ['getDataProvider'],
    queryFn: () => getDataProvider(key),
    gcTime: 100,
    staleTime: 10
  })
}

export const getDataProvider = async (
  key: string
): Promise<{
  items: any
}> => {
  try {
    const dataStorage = await getStorage(key)
    const parseData = JSON.parse(dataStorage || '{}')
    return { items: parseData }
  } catch (e) {
    console.log(e)
    return { items: DATA_SAMPLE }
  }
}

export const setDataProvider = async (
  data: Record<TreeItemIndex, TreeItem<any>>,
  key: string
) => {
  await setStorage(key, JSON.stringify(data))
}
