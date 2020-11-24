import {useTheme} from '@geist-ui/react'
import React from 'react'
import {atom} from 'recoil'
import {getLists} from '../../../shared/storage'
import {TabLists} from '../../../shared/typings'
import {useConfigs} from '../../utils/config-context'
import {List as Component} from './List'

export const List: React.FC = () => {
  const listsState = atom({
    key: 'lists',
    default: ['これだよ', 'これこれ'],
  })

  const [tabLists, setTabLists] = React.useState<TabLists>([])
  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getLists()
      setTabLists(lists.reverse())
    }
    cleanup()
  }, [tabLists])

  const theme = useTheme()
  const configs: any = useConfigs()
  const isDark = React.useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = () => {
    configs.onChange(theme.type === 'dark')
  }

  return (
    <Component isDark={isDark} switchTheme={switchTheme} tabLists={tabLists} />
  )
}
