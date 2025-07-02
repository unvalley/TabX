import { chromeActionService } from './core/services'

export const init = async () => {
  await Promise.all([
    chrome.action.onClicked.addListener(async () => {
      await chromeActionService.storeAllTabs().catch(err => console.error(err))
    }),
  ])
}

init()
