import { Spacer } from '@geist-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { Header } from '~/app/components/organisms/Header'
import { ColorThemes, Languages, Tabs } from '~/app/components/organisms/SettingsSection'
import { tabListsState } from '~/app/store'

type Props = {
  deleteAllTabs: () => void
  version?: string
}

export const Settings: React.FC<Props> = props => {
  const { deleteAllTabs } = props
  const tabLists = useRecoilValue(tabListsState)
  return (
    <>
      <Header text={'TabX'} shouldShowTabStats={false} />
      <ColorThemes />
      <Spacer y={1} />
      <Languages />
      <Spacer y={1} />
      <Tabs deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
      {/* <Contributions /> */}
    </>
  )
}
