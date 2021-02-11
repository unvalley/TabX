import { Spacer } from '@geist-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  ColorThemes,
  //   Contributions,
  Languages,
  Tabs,
  Versions,
} from '~/app/components/organisms/SettingsSection'
import { tabListsState } from '~/app/store'

type Props = {
  deleteAllTabs: () => void
  version?: string
}

export const Settings: React.FC<Props> = props => {
  const { deleteAllTabs, version } = props
  const tabLists = useRecoilValue(tabListsState)
  return (
    <>
      <Tabs deleteAllTabs={deleteAllTabs} tabLists={tabLists} />
      <Spacer y={1} />
      <Languages />
      <Spacer y={1} />
      <ColorThemes />
      <Spacer y={1} />
      <Versions version={version!} />
      <Spacer y={1} />
      {/* <Contributions /> */}
    </>
  )
}
