import { Button, Card, Col, Divider, Grid, Row, Text, Textarea } from '@geist-ui/react'
import { ToggleEvent } from '@geist-ui/react/dist/toggle/toggle'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteButton } from '~/app/components/molecules/DeleteButton'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
import { exportToText } from '~/shared/importExport'
import { StyledToggle, ToggleWrapper } from './style'

type Props = { deleteAllTabs: () => void }

export const Tabs: React.VFC<Props> = props => {
  const [exportText, setExportText] = React.useState('')
  const [showExportText, setShowExportText] = React.useState(false)

  const { t } = useTranslation()
  const [shouldShowTabListHeader, setShouldShowTabGroupCount] = useLocalStorage('shouldShowTabListHeader', true)

  const [shouldDeleteTabWhenClicked, setShouldDeleteTabWhenClicked] = useLocalStorage(
    'shouldDeleteTabWhenClicked',
    true,
  )

  const handleChange = (event: ToggleEvent) => {
    setShouldShowTabGroupCount(event.target.checked)
  }

  const handleDeleteTab = (event: ToggleEvent) => {
    setShouldDeleteTabWhenClicked(event.target.checked)
  }

  const handleClickExportButton = async () => {
    const text = await exportToText()
    setExportText(text)
    setShowExportText(!showExportText)
  }

  return (
    <Grid.Container>
      <Card>
        <Card.Content>
          <Text h4>{t('TABS')}</Text>
        </Card.Content>

        <Divider y={0} />

        <Card.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <ToggleWrapper>
              <StyledToggle checked={shouldShowTabListHeader} onChange={handleChange} />
              <Text>{t('SETTING_SHOW_TAB_GROUP_COUNT')}</Text>
            </ToggleWrapper>
          </span>

          <span>
            <ToggleWrapper>
              <StyledToggle checked={shouldDeleteTabWhenClicked} onChange={handleDeleteTab} />
              <Text>{t('SETTING_DELETE_TAB_WHEN_CLICKED')}</Text>
            </ToggleWrapper>
          </span>

          <span>
            <Row gap={0.8}>
              <Col>
                <Text>{t('SETTING_EXPORT_TEXT')}</Text>
              </Col>
              <Col>
                <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                  <Col>
                    <Button size="medium" onClick={handleClickExportButton}>
                      {showExportText ? t('HIDE_EXPORT_BUTTON') : t('EXPORT_BUTTON')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            {showExportText && <Textarea width="100%" initialValue={exportText} style={{ height: '300px' }} />}
          </span>

          <Divider y={2} />

          <Text b>{t('DANGER_ZONE')}</Text>
          <Row gap={0.8}>
            <Col>
              <Text>{t('DANGER_ZONE_MESSAGE')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                <Col>
                  <DeleteButton onClick={props.deleteAllTabs} label={t('DELETE_ALL_TABS_BUTTON')} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </Grid.Container>
  )
}
