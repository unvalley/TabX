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

export const groupBy = <T extends { [key: string]: any }>(objects: T[], key: keyof T): { [key: string]: T[] } =>
  objects.reduce((map, obj) => {
    map[obj[key]] = map[obj[key]] || []
    map[obj[key]].push(obj)
    return map
  }, {} as { [key: string]: T[] })

/**
 * remove nullable elements
 */
export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null

// Ref: https://qiita.com/hatakoya/items/018afbfb1bd45136618a
type ChainedWhen<T, R> = {
  on: <A>(pred: (v: T) => boolean, fn: () => A) => ChainedWhen<T, R | A>
  otherwise: <A>(fn: () => A) => R | A
}

export const match = <T, R>(val: any): ChainedWhen<T, R> => ({
  // eslint-disable-next-line no-unused-vars
  on: <A>(_pred: (v: T) => boolean, _fn: () => A) => match<T, R | A>(val),
  // eslint-disable-next-line no-unused-vars
  otherwise: <A>(_fn: () => A): A | R => val,
})

export const chain = <T, R>(val: T): ChainedWhen<T, R> => ({
  on: <A>(pred: (v: T) => boolean, fn: () => A) => (pred(val) ? match(fn()) : chain<T, A | R>(val)),
  otherwise: <A>(fn: () => A) => fn(),
})

export const when = <T>(val: T) => ({
  on: <A>(pred: (v: T) => boolean, fn: () => A) => (pred(val) ? match<T, A>(fn()) : chain<T, A>(val)),
})

export const eq = <T>(val1: T) => (val2: T) => val1 === val2
