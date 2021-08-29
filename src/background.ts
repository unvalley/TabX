import { browser } from 'webextension-polyfill-ts'

import { chromeActionService } from './core/services'

export const init = async () => {
  await Promise.all([
    browser.browserAction.onClicked.addListener(async () => {
      await chromeActionService.storeAllTabs().catch(err => console.error(err))
    }),
  ])
}

init()
