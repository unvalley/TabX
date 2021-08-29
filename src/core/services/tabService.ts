import produce from 'immer'

import { createNewTabListFromImport, normalizeUrlText } from '../list'
import { ITabRepo } from '../repos/tabRepo'
import { mutex } from '../shared/storageUtil'
import { TabList } from '../shared/typings'
import { createImportedUrlObjs } from '../shared/utils/importExportUtil'
import { IChromeActionUseCase } from '../useCase/chromeActionUseCase'
import { ITabUseCase } from '../useCase/tabUseCase'

export class TabService implements ITabUseCase {
  constructor(private readonly tabRepo: ITabRepo, private readonly chromeActionService: IChromeActionUseCase) {}

  public async getAllTabList() {
    const result = await this.tabRepo.getAllTabList()
    return result
  }

  public async getAllSimpleTab() {
    const allTabList = await this.tabRepo.getAllTabList()
    const result = allTabList.map(e => e.tabs).flat()
    return result
  }

  public setAllTabList(initialAllTabList: TabList[]) {
    return this.tabRepo.setAllTabList(initialAllTabList)
  }

  public async addTabList(newTabList: TabList) {
    const allTabList = await this.tabRepo.getAllTabList()
    const updatedAllTabList = produce(allTabList, draft => {
      draft.push(newTabList)
    })
    return this.tabRepo.setAllTabList(updatedAllTabList)
  }

  public async addAllTabList(newAllTabList: TabList[]) {
    const allTabList = await this.tabRepo.getAllTabList()
    const updatedAllTabList = produce(allTabList, draft => [...draft, ...newAllTabList])
    return this.tabRepo.setAllTabList(updatedAllTabList)
  }

  public async deleteTabSimple(tabListId: number, tabId: number) {
    const release = await mutex.acquire()
    try {
      // SELECT
      const allTabLists = await this.tabRepo.getAllTabList()
      const updatedAllTabLists = produce(allTabLists, draft => {
        const targetTabListElem = draft.filter(list => list.id === tabListId)[0]
        const index = targetTabListElem.tabs.findIndex(({ id }) => id === tabId)
        targetTabListElem.tabs = targetTabListElem.tabs.filter((_, idx) => idx !== index)
        // DELETE and hanlde if tabs are empty
        !targetTabListElem.tabs.length && this.deleteTabList(tabListId)
      })
      // UPDATE
      this.tabRepo.setAllTabList(updatedAllTabLists)
    } catch (err) {
      console.error(err)
    } finally {
      release()
    }
  }

  public async deleteTabList(tabListId: number) {
    const release = await mutex.acquire()
    try {
      const allTabLists = await this.tabRepo.getAllTabList()
      const updatedAllTabLists = produce(allTabLists, draft => {
        const listIdx = draft.findIndex(({ id }) => id === tabListId)
        draft.splice(listIdx, 1)
      })
      this.tabRepo.setAllTabList(updatedAllTabLists)
    } finally {
      release()
    }
  }

  public async deleteAllTabList() {
    await this.setAllTabList([])
  }

  public async restoreTabList(tabListId: number) {
    // SELECT
    const allTabLists = await this.tabRepo.getAllTabList()
    const targetTabListElem = allTabLists.filter(list => list.id === tabListId)[0]
    // OPEN
    // TODO: refactor
    await this.chromeActionService.restoreTabs(targetTabListElem.tabs).then(async () => {
      // DELETE
      await this.deleteTabList(tabListId)
    })
  }

  public async importFromText(urlText: string) {
    const singleLines = urlText.split('\n')
    const urlObjStore = createImportedUrlObjs(singleLines)
    const tabs = urlObjStore.map(urlObjs => urlObjs.map(urlObj => normalizeUrlText(urlObj)))
    const res = tabs.map(tab => createNewTabListFromImport(tab))
    await this.addAllTabList(res)
  }

  public async exportToText() {
    const allTabList = await this.getAllTabList()
    return allTabList.map(list => list.tabs.map(tab => tab.url + ' | ' + tab.title).join('\n')).join('\n\n')
  }
}
