import {browser} from 'webextension-polyfill-ts'
import {storeAllTabs} from '../shared/tabs'

export const init = async () => {
  await Promise.all([
    browser.commands.onCommand.addListener((command) => {
      if (command === 'storeAllTabs') {
        console.log('Store all tabs')
        // TODO: listIndex
        storeAllTabs(0)
      }
    }),
    // browser.runtime.onMessageExternal.addListener(commandHandler),
  ])
}

init()
