import {browser} from 'webextension-polyfill-ts'
import {storeAllTabs} from './shared/tabs'

export const init = async () => {
  await Promise.all([
    browser.browserAction.onClicked.addListener(() => {
      console.log('Store all tabs')
      storeAllTabs()
    }),
    // browser.runtime.onMessageExternal.addListener(commandHandler),
  ])
}

init()
