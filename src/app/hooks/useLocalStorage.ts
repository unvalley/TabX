import {useState, useEffect} from 'react'

const isString = (val: any) => typeof val === 'string'

/**
 * localStorageを扱うHook
 * Ref: https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md
 * @param key
 * @param initialValue
 * @param raw JSONシリアライズせずに，生で取得したい場合にtrueを渡す
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean,
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key)

      if (isString(localStorageValue)) {
        return raw ? localStorageValue : JSON.parse(localStorageValue || 'null')
      } else {
        const val = isString(initialValue)
          ? JSON.stringify(initialValue)
          : String(initialValue)

        localStorage.setItem(key, val)
        return initialValue
      }
    } catch (err) {
      console.error(err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state)
      localStorage.setItem(key, serializedState)
    } catch (err) {
      console.error(err)
    }
  })

  return [state, setState]
}
