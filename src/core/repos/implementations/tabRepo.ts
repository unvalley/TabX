import { TabList } from '~/core/shared/typings'
import { getStorage, setStorage } from '~/core/shared/utils/storageUtil'

import { ITabRepo } from '../tabRepo'

type TabLists = 'tabLists'

export class TabRepo implements ITabRepo {
  private keyName: TabLists = 'tabLists'

  public async getAllTabList() {
    const result = await getStorage(this.keyName).then(data =>
      Array.isArray(data[this.keyName]) ? (data[this.keyName] as TabList[]) : [],
    )
    return result
  }

  public setAllTabList(allTabList: TabList[]) {
    return setStorage({ [this.keyName]: allTabList })
  }

  public deleteAllTabList() {
    return setStorage({ [this.keyName]: null })
  }
}
