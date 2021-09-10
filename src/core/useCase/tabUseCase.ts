import { TabList, TabSimple } from '../shared/typings'

// TODO: ISP
export interface ITabUseCase {
  getAllTabList(): Promise<TabList[]>
  getAllSimpleTab(): Promise<TabSimple[]>
  getAllFavoriteTabList(): Promise<TabList[]>
  setAllTabList(allTabList: TabList[]): Promise<void>
  addTabList(newTabList: TabList): Promise<void>
  addAllTabList(newAllTabList: TabList[]): Promise<void>
  deleteTabSimple(tabListId: number, tabId: number): Promise<void>
  deleteTabList(tabListId: number, tabId: number): Promise<void>
  importFromText(urlText: string): Promise<void>
  exportToText(): Promise<string>
  uniqueAllTabList(): Promise<boolean>
  saveTabListDescription(description: string, tabListId: number): Promise<void>
  favoriteTabList(tabListId: number): Promise<void>
  removeFavoriteTabList(tabListId: number): Promise<void>
}
