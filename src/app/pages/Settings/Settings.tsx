import { Spacer } from '@geist-ui/react'
import React from 'react'
import {
  ColorThemes,
  //   Contributions,
  Languages,
  Tabs,
  Versions,
} from '~/app/components/organisms/SettingsSection'

type Props = {
  deleteAllTabs: () => void
  version?: string
}

export const Settings: React.FC<Props> = props => {
  return (
    <>
      <Tabs deleteAllTabs={props.deleteAllTabs} />
      <Spacer y={1} />
      <Languages />
      <Spacer y={1} />
      <ColorThemes />
      <Spacer y={1} />
      <Versions version={props.version!} />
      <Spacer y={1} />
      {/* <Contributions /> */}
    </>
  )
}
