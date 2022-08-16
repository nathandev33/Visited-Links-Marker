export interface SyncStorage {
  where_options: string
  link_color: string
  link_background: string
  except_sites: string[]
  only_sites: string[]
}

export type SyncStorageKeys = keyof SyncStorage

export function getStoredOptions(): Promise<SyncStorage> {
  const keys: SyncStorageKeys[] = [
    'where_options',
    'link_color',
    'link_background',
    'except_sites',
    'only_sites',
  ]
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (response: SyncStorage) => {
      resolve(response)
    })
  })
}
