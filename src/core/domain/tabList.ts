import { Either, left, right } from 'fp-ts/lib/Either'
import { Tabs } from 'webextension-polyfill-ts'

import { TabSimpleMap } from '../mappers/tabSimpleMap'
import { genObjectId } from '../shared/utils'
import { TabSimple } from './tabSimple'

type TabListType = {
  id: number
  title: string
  description: string
  tabs: TabSimple[]
  hasPinned: boolean
  createdAt: number
  updatedAt: number
}

export class TabList {
  public readonly props: TabListType

  constructor(props: TabListType) {
    this.props = props
  }

  public static create(props: Tabs.Tab[]): Either<string, TabList> {
    if (!props.length) return left('TODO: something error message')

    const tabList = new TabList({
      id: genObjectId(),
      title: '',
      description: '',
      // has pinned on this extension? - default false
      hasPinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tabs: props.map(e => TabSimpleMap.toDomain(e)),
    })
    return right(tabList)
  }
}
