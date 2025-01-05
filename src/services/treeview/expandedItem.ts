import { getStorage, setStorage } from '@/functions/storage'

export const setExpandedItem = async (
  item: string | number,
  key: string,
  state: 'expanded' | 'collapsed'
) => {
  const itemExpanded = item.toString()
  const dataStorage = await getStorage(key)
  const data = JSON.parse(dataStorage || '[]') as string[]
  if (state === 'collapsed' && data.indexOf(itemExpanded) === -1) {
    data.push(itemExpanded)
  }
  if (state === 'expanded' && data.indexOf(itemExpanded) !== -1) {
    data.splice(data.indexOf(itemExpanded), 1)
  }
  await setStorage(key, JSON.stringify(data))
}

export const getExpandedItems = async (key: string): Promise<string[]> => {
  const dataStorage = await getStorage(key)
  return JSON.parse(dataStorage || '[]')
}
