import { useTranslation } from 'react-i18next'

import { TabList } from '~/backend/shared/typings'
import { omitText } from '~/backend/shared/utils'

import { Lang } from '../constants'

export const getDisplayTitle = (tabList: TabList, withLongText: boolean) => {
  const { i18n } = useTranslation()

  const maxLength = withLongText ? 40 : 25
  const firstTabLinkTitle = omitText(tabList.tabs[0] ? tabList.tabs[0].title : 'title')(maxLength)('…')
  const getTitle = (lang: string) =>
    lang === Lang.JAPANESE
      ? `${firstTabLinkTitle}と${tabList.tabs.length - 1}件`
      : `${firstTabLinkTitle} & ${tabList.tabs.length - 1} tabs`

  const displayTitle = tabList.tabs.length > 1 ? getTitle(i18n.language) : `${firstTabLinkTitle}`
  return displayTitle
}
