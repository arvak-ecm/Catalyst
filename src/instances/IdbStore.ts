import { createStore, del, get, set, UseStore } from 'idb-keyval'

interface IIDBFactoryKeyVal {
  getStore(): UseStore
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T): Promise<void>
  delete(key: string): Promise<void>
}

export class IDBFactoryKeyVal implements IIDBFactoryKeyVal {
  public static instances: Map<string, IDBFactoryKeyVal> = new Map()
  private store: UseStore

  public constructor(dbName: string, storeName: string) {
    this.store = createStore(dbName, storeName)
  }

  // Factory method to get or create an instance
  public static getInstance(
    dbName: string,
    storeName: string
  ): IDBFactoryKeyVal {
    const key = `${dbName}_${storeName}`
    if (!this.instances.has(key)) {
      this.instances.set(key, new IDBFactoryKeyVal(dbName, storeName))
    }
    return this.instances.get(key)!
  }

  getStore(): UseStore {
    return this.store
  }

  async get<T>(key: string): Promise<T | undefined> {
    return get<T>(key, this.store)
  }

  async set<T>(key: string, value: T): Promise<void> {
    return set(key, value, this.store)
  }

  async delete(key: string): Promise<void> {
    return del(key, this.store)
  }
}
