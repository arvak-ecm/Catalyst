import { AppContext } from '@/context/appContext'
import { useContext } from 'react'
export const useStore = (dbName: string, storeName: string) => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }

  // Obtener el store específico
  return context.getStore(dbName, storeName)
}
