import { browser } from 'webextension-polyfill-ts'

import { storeAllTabs } from './shared/tabAction'

export const init = async () => {
  await Promise.all([
    browser.browserAction.onClicked.addListener(async () => {
      await storeAllTabs().catch(err => console.error(err))
    }),
  ])
}

init()
