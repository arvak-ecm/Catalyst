import { getThemeStyle } from '@/functions/getThemeStyle'
import { getThemeSystem } from '@/functions/getThemeSystem'
import { ThemeProps } from '@/types/theme'
import { use } from 'react'
import { AppContext } from '../context/appContext'
import { useStore } from './useStore'

const values = {
  theme: {
    theme: 'dark',
    color: 'rose',
    radius: '0.5rem'
  },
  dbName: 'GLOBAL_STATE',
  tableName: 'PARAMETERS'
}

const useTheme = () => {
  const store = useStore(values.dbName, values.tableName)
  const context = use(AppContext)

  const changeTheme = async (newTheme: ThemeProps) => {
    if (newTheme.theme === 'system') {
      newTheme.theme = getThemeSystem(newTheme.theme)
    }
    context!.setTheme(newTheme)
    await store.set('theme', newTheme)
    await getThemeStyle(
      `resources/themes/${newTheme.theme}/${newTheme.color}.css`,
      newTheme
    )
    await getThemeStyle(`resources/themes/${newTheme.theme}.css`, newTheme)
  }

  return {
    theme: context!.theme,
    changeTheme
  }
}

export default useTheme
