import produce from 'immer'

import { InvalidDescriptionError } from '../errors/tab/InvalidDescriptionError'
import { createNewTabListFromImport } from '../factory/tabList'
import { normalizeUrlText } from '../factory/tabSimple'
import { ITabRepo } from '../repos/tabRepo'
import { TabList } from '../shared/typings'
import { createImportedUrlObjs } from '../shared/utils/importExportUtil'
import { mutex } from '../shared/utils/storageUtil'
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

  public setAllTabList(allTabList: TabList[]) {
    return this.tabRepo.setAllTabList(allTabList)
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
    await this.addAllTabList(res).catch(err => console.error(err))
  }

  public async exportToText() {
    const allTabList = await this.getAllTabList()
    return allTabList.map(list => list.tabs.map(tab => tab.url + ' | ' + tab.title).join('\n')).join('\n\n')
  }

  public async uniqueAllTabList() {
    const release = await mutex.acquire()
    const uniqUrls = new Set()
    const isEmptyArray = <T>(list: T[]) => list.length === 0
    let hasProcessed = false

    try {
      const allTabList = await this.getAllTabList().then(res => res.reverse())
      allTabList.forEach((tabList, tabListIdx) => {
        tabList.tabs.forEach((tab, _) => {
          if (uniqUrls.has(tab.url)) {
            tabList.tabs = !isEmptyArray(tabList.tabs) ? tabList.tabs.filter(t => t.url !== tab.url) : tabList.tabs
            if (isEmptyArray(tabList.tabs)) {
              allTabList.splice(tabListIdx, 1)
            }
            hasProcessed = true
          } else {
            uniqUrls.add(tab.url)
          }
        })
      })
      await this.setAllTabList(allTabList.reverse())
    } finally {
      release()
    }

    return hasProcessed
  }

  public async saveTabListDescription(description: string, tabListId: number) {
    if (description.length > 1000) throw new InvalidDescriptionError()

    const allTabList = await this.getAllTabList()
    const updatedAllTabLists = produce(allTabList, draft => {
      const listIdx = draft.findIndex(({ id }) => id === tabListId)
      const targetList = draft[listIdx]
      targetList.description = description
    })

    await this.setAllTabList(updatedAllTabLists)
  }
}
