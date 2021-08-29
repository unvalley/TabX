import { isLeft } from 'fp-ts/Either'
import { Tabs } from 'webextension-polyfill-ts'

import { TabSimple } from '../domain/tabSimple'

export class TabSimpleMap {
  public static toDomain(props: Tabs.Tab): TabSimple {
    const tabSimpleOrError = TabSimple.create(props)
    if (isLeft(tabSimpleOrError)) throw new Error(tabSimpleOrError.left)
    return tabSimpleOrError.right
  }
}
