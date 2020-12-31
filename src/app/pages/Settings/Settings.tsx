import React from 'react'
import {Tabs} from './Internal/Tabs'
import {Languages} from './Internal/Languages'
import {Contributions} from './Internal/Contributions'
import {Versions} from './Internal/Versions'
import {ColorThemes} from './Internal/ColorThemes'
import {Spacer} from '@geist-ui/react'

type Props = {
  deleteAllTabs: () => void
  version?: string
}

export const Settings: React.FC<Props> = (props) => {
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
      <Contributions />
    </>
  )
}
