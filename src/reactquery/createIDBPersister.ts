import {
  PersistedClient,
  Persister
} from '@tanstack/react-query-persist-client'
import { createStore, del, get, set, UseStore } from 'idb-keyval'

function createIDBPersister(
  idbValidKey: IDBValidKey = 'reactQuery',
  store: UseStore
) {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client, store)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey, store)
    },
    removeClient: async () => {
      await del(idbValidKey, store)
    }
  } as Persister
}

const persister = createIDBPersister(
  'reactQuery',
  createStore('reactQueryDB', 'reactQueryDBCatalyst')
)

export default persister
