import { useTranslation } from 'react-i18next'
import { Rule } from '~/ui/constants/styles'
import { TabList } from '~/shared/typings'
import { omitText } from '~/shared/utils'
import { Lang } from '../constants'

export const useTitle = (tabList: TabList) => {
  const { i18n } = useTranslation()

  const firstTabLinkTitle = omitText(tabList.tabs[0].title)(Rule.TITLE_MAX_LENGTH)('…')
  const getTitle = (lang: string) =>
    lang === Lang.JAPANESE
      ? `${firstTabLinkTitle}と${tabList.tabs.length - 1}件`
      : `${firstTabLinkTitle} & ${tabList.tabs.length - 1} tabs`

  const displayTitle = tabList.tabs.length > 1 ? getTitle(i18n.language) : `${firstTabLinkTitle}`
  return displayTitle
}
