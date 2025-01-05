import { getFileResources } from '@/functions/getFileResources'
import { getThemeStyle } from '@/functions/getThemeStyle'
import { getThemeSystem } from '@/functions/getThemeSystem'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { ThemeProps } from '@/types/theme'

const key = 'GLOBAL_STATE_PARAMETERS'
const dbName = 'GLOBAL_STATE'
const storeName = 'PARAMETERS'

export const changeTheme = async (newTheme: ThemeProps) => {
  const store = IDBFactoryKeyVal.getInstance(dbName, storeName)
  if (!store) {
    throw new Error(`Error: IDBFactoryKeyVal instance not found key: ${key}`)
  }
  if (newTheme.theme === 'system') {
    newTheme.theme = getThemeSystem(newTheme.theme)
  }
  await store.set('theme', newTheme)
  await getThemeStyle(
    `resources/themes/${newTheme.theme}/${newTheme.color}.css`,
    newTheme
  )
  await getThemeStyle(`resources/themes/${newTheme.theme}.css`, newTheme)
}

export const theme = async (): Promise<ThemeProps> => {
  const db = IDBFactoryKeyVal.getInstance(dbName, storeName)
  if (!db) {
    throw new Error(`Error: IDBFactoryKeyVal instance not found key: ${key}`)
  }
  let theme = await db.get<ThemeProps>('theme')
  if (!theme) {
    const file = await getFileResources(
      'resources/defaultdata/themeDefault.json',
      'json'
    )
    theme = file as ThemeProps
  }
  await changeTheme(theme)
  return theme
}
