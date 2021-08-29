import { TabList } from '../shared/typings'

export interface ITabRepo {
  getAllTabList(): Promise<TabList[]>
  setAllTabList(allTabList: TabList[]): Promise<void>
  deleteAllTabList(): Promise<void>
}
