import {TabListElem} from '~/shared/typings'
import {omitText} from '~/shared/utils/util'
import {Rule} from '../constants/rule'

export const useTitle = (tabList: TabListElem) => {
  const firstTabLinkTitle = omitText(tabList.tabs[0].title!)(
    Rule.TITLE_MAX_LENGTH,
  )('…')

  const displayTitle =
    tabList.tabs.length > 1
      ? `「${firstTabLinkTitle}」と${tabList.tabs.length - 1}件`
      : firstTabLinkTitle

  return displayTitle
}
