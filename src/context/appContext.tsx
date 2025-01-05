import React, { createContext, useState } from 'react'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { ThemeProps } from '@/types/theme'

// Props para el Provider
interface Props {
  children: React.ReactNode
  theme: ThemeProps
  os: string
  locale: string
}

// Tipo del contexto
interface AppContextType {
  getStore: (dbName: string, storeName: string) => IDBFactoryKeyVal
  theme: ThemeProps
  os: string
  locale: string
  setTheme: (theme: ThemeProps) => void
}
// Crear el Contexto
export const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({
  children,
  theme: initialTheme,
  locale,
  os
}: Props) => {
  const [theme, setTheme] = useState<ThemeProps>(initialTheme)
  const getStore = (dbName: string, storeName: string): IDBFactoryKeyVal => {
    const store = IDBFactoryKeyVal.getInstance(dbName, storeName)
    if (!store) {
      throw new Error(
        `Store not found for dbName: ${dbName}, storeName: ${storeName}`
      )
    }
    return store
  }
  return (
    <AppContext value={{ getStore, theme: theme, setTheme, os, locale }}>
      {children}
    </AppContext>
  )
}
