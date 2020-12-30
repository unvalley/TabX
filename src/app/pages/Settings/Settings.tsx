import React from 'react'
import {Tabs} from './Internal/Tabs'
import {Languages} from './Internal/Languages'
import {Contributions} from './Internal/Contributions'
import {Versions} from './Internal/Versions'
import {ColorThemes} from './Internal/ColorThemes'

type Props = {
  deleteAllTabs: () => void
  version?: string
}

export const Settings: React.FC<Props> = (props) => {
  return (
    <>
      <Tabs deleteAllTabs={props.deleteAllTabs} />
      <Languages />
      <ColorThemes />
      <Versions version={props.version!} />
      <Contributions />
    </>
  )
}
