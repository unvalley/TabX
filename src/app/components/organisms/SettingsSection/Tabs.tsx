import {Card, Col, Divider, Grid, Row, Text} from '@geist-ui/react'
import {ToggleEvent} from '@geist-ui/react/dist/toggle/toggle'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {DeleteButton} from '~/app/components/molecules/DeleteButton'
import {useLocalStorage} from '~/app/hooks/useLocalStorage'
import {StyledToggle, ToggleWrapper} from './style'

type Props = {deleteAllTabs: () => void}

export const Tabs: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()
  const [
    shouldShowTabGroupCounts,
    setShouldShowTabGroupCount,
  ] = useLocalStorage('shouldShowTabGroupCounts', true)

  const [
    shouldDeleteTabWhenClicked,
    setShouldDeleteTabWhenClicked,
  ] = useLocalStorage('shouldDeleteTabWhenClicked', true)

  const handleChange = (event: ToggleEvent) => {
    setShouldShowTabGroupCount(event.target.checked)
  }

  const handleDeleteTab = (event: ToggleEvent) => {
    setShouldDeleteTabWhenClicked(event.target.checked)
  }

  return (
    <Grid.Container>
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

          <span>
            <ToggleWrapper>
              <StyledToggle
                checked={shouldDeleteTabWhenClicked}
                onChange={handleDeleteTab}
              />
              <Text>{t('SETTING_DELETE_TAB_WHEN_CLICKED')}</Text>
            </ToggleWrapper>
          </span>

          <Divider y={2} />

          <Text b>{t('DANGER_ZONE')}</Text>
          <Row gap={0.8}>
            <Col>
              <Text>{t('DANGER_ZONE_MESSAGE')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{height: '100%', textAlign: 'right'}}>
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
    </Grid.Container>
  )
}
