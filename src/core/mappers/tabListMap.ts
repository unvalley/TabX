import { isLeft } from 'fp-ts/Either'
import { Tabs } from 'webextension-polyfill-ts'

import { TabList } from '../domain/tabList'

export class TabListMap {
  public static toDomain(props: Tabs.Tab[]): TabList {
    const tabListOrError = TabList.create(props)
    if (isLeft(tabListOrError)) throw new Error(tabListOrError.left)
    return tabListOrError.right
  }
}
