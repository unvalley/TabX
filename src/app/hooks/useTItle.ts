import { Rule } from '~/app/constants/styles'
import { TabList } from '~/shared/typings'
import { omitText } from '~/shared/utils/util'

export const useTitle = (tabList: TabList) => {
  //   const [t, _] = useTranslation()

  const firstTabLinkTitle = omitText(tabList.tabs[0].title)(Rule.TITLE_MAX_LENGTH)('…')

  // TODO: adapt title to multiple languages
  const displayTitle =
    tabList.tabs.length > 1 ? `「${firstTabLinkTitle}」と${tabList.tabs.length - 1}件` : firstTabLinkTitle

  return displayTitle
}
