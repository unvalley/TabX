import { TabSimple } from '../typings'

export const genObjectId = (): number => {
  const timestamp = (new Date().getTime() / 1000) | 0
  return timestamp + Math.random() * 16
}

export const zip = <T, U>(arr1: T[], arr2: U[]) => arr1.map((_, i) => [arr1[i], arr2[i]] as [T, U])

export const omitText = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

export const genParamsToFetchMetadata = (tabs: TabSimple[]) =>
  tabs.map(tab => {
    return {
      id: tab.id as number,
      url: tab.url as string,
    }
  })

// eslint-disable-next-line
export const isString = (val: any): val is string => typeof val === 'string'
