import { tabRepo } from '../repos'
import { TabService } from './tabService'

export const tabService = new TabService(tabRepo)
