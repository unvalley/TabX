import {Col, Link, Row} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {useImmerReducer} from 'use-immer'
import {Tabs} from 'webextension-polyfill-ts'
import {FaviconImage} from '../../../components/atoms/FaviconImage'
import {Spacing} from '../../../constants/styles'
import {initialState, reducer} from '../../../store/index'

type Props = {tabs: Tabs.Tab[]; tabListIdx: number}

const Tab = styled(Row)`
    display: flex;
    padding ${Spacing['0.5']} ${Spacing['3']}
`
const TitleLink = styled(Link)`
    word-break: break-all
    font-size: 13px
`

// const removeItemAtIndex = (tabLists: TabLists, arr, index) => {
//   //   return [...arr.slice(0, index), ...arr.slide(index + 1)]
// }

/**
 * TabGroupsの要素
 * - アイコンやタイトルを表示
 */
export const TabLinks: React.FC<Props> = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const onDelete = (idx: number) => {
    dispatch({type: 'remove'})
    // const targetTabListElem = tabLists[props.tabListIdx]
    // setTabLists((tabLists) => {
    //   const updatedTabs = targetTabListElem.tabs.filter((_, i) => i !== idx)
    //   const key = targetTabListElem['tabs']
    //   return updatedTabs
    // }
    // const newList = removeItemAtIndex(
    //   tabLists,
    //   tabLists[props.tabListIdx].tabs,
    //   idx,
    // )
    // setTabLists(newList)
    // setTabLists((tabLists) => {
    // //   const t = tabLists[props.tabListIdx].tabs.filter((_, i) => i !== idx)
    // //   tabLists[props.tabListIdx]['tabs'] = t
    // //   return tabLists
    // })
  }

  return (
    <>
      {props.tabs.map((tab, idx) => (
        <Tab key={idx} gap={2}>
          <Col>
            <FaviconImage src={tab.favIconUrl!} />
          </Col>
          <Col span={18}>
            <TitleLink
              color
              target="_blank"
              href={tab.url}
              //   onClick={() => onDelete(id, tab.id!)}
            >
              {tab.title}
            </TitleLink>
          </Col>
          <Col span={4}>
            <span onClick={() => onDelete(idx)}>x</span>
          </Col>
        </Tab>
      ))}
    </>
  )
}
