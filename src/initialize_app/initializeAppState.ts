import { stores } from '@/data/stores'
import { IDBFactoryKeyVal } from '@/instances/IdbStore'
import { AppConfigProps } from '@/types/application'
import { platform } from '@tauri-apps/plugin-os'
import { initializeApiStream } from './apiStream'
import { theme } from './theme'

const deleteStorages = async () => {
  try {
    const request = indexedDB.deleteDatabase('APISTREAM')
    request.onsuccess = () => {
      console.log('Successfully deleted database')
    }
    request.onerror = () => {
      console.log('Error deleting database')
    }
  } catch (e) {
    console.log(e)
  }
}

const createStores = async () => {
  const globalState = indexedDB.open('GLOBAL_STATE', 1)
  globalState.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    db.createObjectStore('PARAMETERS')
    db.close()
  }
  const db_Apistream = indexedDB.open('APISTREAM', 1)
  db_Apistream.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    db.createObjectStore('GLOBALS')
    db.createObjectStore('COLLECTIONS')
    db.createObjectStore('ENVIROMENTS')
    db.close()
  }

  stores.map(({ dbName, storeName }) => {
    const key = `${dbName}_${storeName}`
    const store = IDBFactoryKeyVal.getInstance(dbName, storeName)
    return [key, store]
  })
}

export const initializeAppState = async (): Promise<AppConfigProps> => {
  await createStores()
  const [os, themeConfig] = await Promise.all([
    platform(),
    theme(),
    initializeApiStream()
  ])
  //console.log("os", os);
  return {
    theme: themeConfig,
    os: os,
    locale: 'es'
  }
}
