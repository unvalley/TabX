import { tabRepo } from '../repos'
import { ChromeActionService } from './chromeActionService'
import { TabService } from './tabService'

export const tabService = new TabService(tabRepo)
export const chromeActionService = new ChromeActionService(tabService)
