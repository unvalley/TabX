import { TabListElem } from '~/shared/typings'
import { omitText } from '~/shared/utils/util'
import { Rule } from '~/app/constants/styles'

export const useTitle = (tabList: TabListElem) => {
  //   const [t, _] = useTranslation()

  const firstTabLinkTitle = omitText(tabList.tabs[0].title!)(Rule.TITLE_MAX_LENGTH)('…')

  // TODO: adapt title to multiple languages
  const displayTitle =
    tabList.tabs.length > 1 ? `「${firstTabLinkTitle}」と${tabList.tabs.length - 1}件` : firstTabLinkTitle

  return displayTitle
}
