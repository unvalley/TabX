import { tabRepo } from '../repos'
import { ChromeActionService } from './chromeActionService'
import { TabService } from './tabService'

export const chromeActionService = new ChromeActionService()
export const tabService = new TabService(tabRepo, chromeActionService)
