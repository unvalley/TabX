import { useToasts } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { tabListsState } from '~/app/store'
import { domainTabListsState } from '~/app/store/domainTabLists'
import { DOMAIN_TAB_LISTS, TAB_LISTS } from '~/shared/constants'
import { deleteAllLists } from '~/shared/storage'
import { DomainTabList, TabList } from '~/shared/typings'
import { Settings as Component } from './Settings'

export const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [, setToast] = useToasts()
  const setTabLists = useSetRecoilState(tabListsState)
  const setDomainTabLists = useSetRecoilState(domainTabListsState)

  const deleteAllTabs = async () => {
    if (confirm(t('DELETE_MESSAGE'))) {
      await deleteAllLists(TAB_LISTS)
        .then(() => setTabLists([{}] as TabList[]))
        .catch(err => console.error(err))
      await deleteAllLists(DOMAIN_TAB_LISTS)
        .then(() => setDomainTabLists([{}] as DomainTabList[]))
        .catch(err => console.error(err))
    }
    setToast({
      text: t('DELETED_ALL_TABS'),
    })
  }

  return <Component deleteAllTabs={deleteAllTabs} />
}
