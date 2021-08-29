import { Either, left, right } from 'fp-ts/lib/Either'
import { Tabs } from 'webextension-polyfill-ts'

import { genObjectId } from '../shared/utils'
import { TabDomain } from './tabDomain'
import { TabUrl } from './tabUrl'

export class TabSimple {
  public readonly props: any

  constructor(props: any) {
    this.props = props
  }

  public getValue() {
    return this.props
  }

  public static create(props: Tabs.Tab): Either<string, TabSimple> {
    if (props.url === undefined) return left('TODO: something error message')

    const tabSimple = new TabSimple({
      id: props.id || genObjectId(),
      title: props.title || '',
      pinned: props.pinned || false,
      favorite: false,
      lastAccessed: props.lastAccessed || Date.now(),
      url: new TabUrl(props.url),
      favIconUrl: props.favIconUrl || '',
      ogImageUrl: '',
      description: '',
      domain: new TabDomain(props.url),
    })
    return right(tabSimple)
  }
}
