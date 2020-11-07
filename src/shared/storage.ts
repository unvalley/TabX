import {browser} from 'webextension-polyfill-ts'

const get = (key: string) => browser.storage.local.get(key)
const set = (obj: object) => browser.storage.local.set(obj)

export const getLists = () => get('lists').then(({lists}) => lists || [])
