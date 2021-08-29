import { Mutex } from 'async-mutex'
import { browser } from 'webextension-polyfill-ts'

export const mutex = new Mutex()

export const getStorage = (key: string) => browser.storage.local.get(key)
export const setStorage = (obj: Record<string, unknown>) => browser.storage.local.set(obj)
