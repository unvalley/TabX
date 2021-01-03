import {Card, Col, Divider, Row, Text, Toggle} from '@geist-ui/react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {DeleteButton} from '../../../components/molecules/DeleteButton'
import {useLocalStorage} from '../../../hooks/useLocalStorage'

export const Tabs: React.VFC<{deleteAllTabs: () => void}> = (props) => {
  const [t, i18n] = useTranslation()
  const [val, setVal] = useLocalStorage('shouldShowTabGroupCounts', true)
  const handler = (event: any) => {
    setVal(event.target.checked)
  }

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('TABS')}</Text>
      </Card.Content>

      <Divider y={0} />

      <Card.Content>
        <Text>ウィンドウが開かれたタイミングでTabXを起動する？</Text>
        <Text>グループ内のタブ数を表示する</Text>
        <Toggle size="medium" checked={val} onChange={handler} />

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
