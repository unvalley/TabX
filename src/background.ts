import { browser } from 'webextension-polyfill-ts'
import { storeAllTabs } from './shared/tabAction'

export const init = async () => {
  await Promise.all([
    browser.browserAction.onClicked.addListener(async () => {
      console.log('Store all tabs')
      await storeAllTabs()
    }),
    // browser.runtime.onMessageExternal.addListener(commandHandler),
  ])
}

init()
