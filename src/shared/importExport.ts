import {Tabs} from 'webextension-polyfill-ts'
import * as Storage from './storage'
import {TabListElem, TabWithMeta} from './typings'

export const exportToText = async () => {
  const lists = await Storage.getAllTabLists()

  return lists
    .map((list: TabListElem) =>
      (list.tabs as Array<Tabs.Tab | TabWithMeta>)
        .map((tab) => tab.url + ' | ' + tab.title)
        .join('\n'),
    )
    .join('\n\n')
}
