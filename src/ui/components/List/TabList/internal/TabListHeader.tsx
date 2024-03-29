import { Modal, Popover, Textarea, useInput, useModal, useTheme, useToasts } from '@geist-ui/react'
import { Menu } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SetterOrUpdater } from 'recoil'
import styled from 'styled-components'

import { tabService } from '~/core/services'
import { TabList } from '~/core/shared/typings'
import { Spacing } from '~/ui/constants/styles'
import { useMouseOver } from '~/ui/hooks'
import { getDisplayTitle } from '~/ui/utils/tabListTitle'

import { _Row, HoveredMenu } from '../style'
import { TabListMenuContent } from './TabListMenuContent'

type Props = {
  index: number
  tabList: TabList
  setTabList: SetterOrUpdater<TabList>
  isLG?: boolean
}

const MAX_INPUT_LENGTH = 1000

export const TabListHeader: React.VFC<Props> = ({ index, tabList, setTabList, isLG }) => {
  const { handleMouseOver, handleMouseOut } = useMouseOver()
  const displayTitle = getDisplayTitle(tabList, isLG || false)
  const [, setToast] = useToasts()
  const { t } = useTranslation()

  // theme
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  const { setVisible: setModalVisible, bindings: modalBindings } = useModal()
  const { state: inputState, bindings: textAreaBindings } = useInput(tabList.description || '')

  const saveDescription = async () => {
    setModalVisible(false)

    if (inputState.length > MAX_INPUT_LENGTH) {
      alert('Over the limit text length! (文字数が1000文字の制限を超えています)')
      return
    }

    await tabService
      .saveTabListDescription(inputState, tabList.id)
      .then(() => {
        setToast({ type: 'success', text: t('SAVE_DESCRIPTION') })
        const newTabList = { ...tabList, description: inputState }
        setTabList(newTabList)
      })
      .catch(e => setToast({ type: 'error', text: e.message }))
  }

  return (
    <>
      <_Row
        style={{ minHeight: '50px' }}
        onMouseOver={() => handleMouseOver(index)}
        onMouseLeave={() => handleMouseOut()}
      >
        <HoveredMenu>
          <_Popover
            placement={'bottomStart'}
            leaveDelay={2}
            offset={12}
            content={
              <TabListMenuContent
                openEditDescriptionModal={() => setModalVisible(true)}
                tabList={tabList}
                setTabList={setTabList}
              />
            }
            style={{
              padding: Spacing['2'],
            }}
            $color={popoverColor}
            $bgColor={popoverBgColor}
          >
            <Menu
              style={{
                opacity: '0.7',
                fontSize: '18px',
                verticalAlign: 'middle',
              }}
            />
          </_Popover>
        </HoveredMenu>
        <TabListTitle>{displayTitle}</TabListTitle>
      </_Row>

      <Modal {...modalBindings}>
        <Modal.Title>Edit Description</Modal.Title>
        <Modal.Content>
          <Textarea width="100%" {...textAreaBindings} />
        </Modal.Content>
        <Modal.Action passive onClick={() => setModalVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={saveDescription}>Save</Modal.Action>
      </Modal>
    </>
  )
}

const _Popover = styled(Popover)<{ $bgColor: string; $color: string }>`
  cursor: pointer;
  margin-right: 20px;
  border-radius: 50%;
  transition: all 0.3s ease;
  vertical-align: middle !important;
  line-height: 0;
  &:hover {
    color: ${props => props.$color};
    background-color: ${props => props.$bgColor};
  }
`

const TabListTitle = styled.span`
  display: block;
  font-weight: 600;
  font-size: 18px;
  align-self: center;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 16px;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis; */
  }
`
