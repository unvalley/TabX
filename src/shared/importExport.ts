import { TAB_LISTS } from './constants'
import * as Storage from './storage'
import { TabList } from './typings'

export const exportToText = async () => {
  const lists = await Storage.getAllLists(TAB_LISTS)

  return lists.map((list: TabList) => list.tabs.map(tab => tab.url + ' | ' + tab.title).join('\n')).join('\n\n')
}
