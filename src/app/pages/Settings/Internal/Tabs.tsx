import {Card, Col, Divider, Row, Text, Toggle} from '@geist-ui/react'
import {ToggleEvent} from '@geist-ui/react/dist/toggle/toggle'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {DeleteButton} from '../../../components/molecules/DeleteButton'
import {Spacing} from '../../../constants/styles'
import {useLocalStorage} from '../../../hooks/useLocalStorage'

const ToggleWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`

const StyledToggle = styled(Toggle).attrs({
  size: 'large',
})`
  margin: ${Spacing['2']};
`

type Props = {deleteAllTabs: () => void}

export const Tabs: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()
  const [
    shouldShowTabGroupCounts,
    setShouldShowTabGroupCount,
  ] = useLocalStorage('shouldShowTabGroupCounts', true)

  const handleChange = (event: ToggleEvent) => {
    setShouldShowTabGroupCount(event.target.checked)
  }

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('TABS')}</Text>
      </Card.Content>

      <Divider y={0} />

      <Card.Content style={{display: 'flex', flexDirection: 'column'}}>
        <span>
          <ToggleWrapper>
            <StyledToggle
              checked={shouldShowTabGroupCounts}
              onChange={handleChange}
            />
            <Text>{t('SETTING_SHOW_TAB_GROUP_COUNT')}</Text>
          </ToggleWrapper>
        </span>

        <Divider y={2} />

        <Text b>{t('DANGER_ZONE')}</Text>
        <Row gap={0.8} style={{}}>
          <Col span={16}>
            <Text>{t('DANGER_ZONE_MESSAGE')}</Text>
          </Col>
          <Col span={8}>
            <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
              <Col>
                <DeleteButton
                  onClick={props.deleteAllTabs}
                  label={t('DELETE_ALL_TABS')}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Content>
    </Card>
  )
}
