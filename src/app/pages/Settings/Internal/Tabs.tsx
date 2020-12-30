import {Card, Col, Divider, Row, Text} from '@geist-ui/react'
import React from 'react'
import {DeleteButton} from '../../../components/molecules/DeleteButton'
import {useTranslation} from 'react-i18next'

export const Tabs: React.VFC<{deleteAllTabs: () => void}> = (props) => {
  const [t, i18n] = useTranslation()

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('TABS')}</Text>
      </Card.Content>

      <Divider y={0} />

      <Card.Content>
        <Text>ウィンドウが開かれたタイミングでTabXを起動する？</Text>
        <Text>アイコンをクリックしたときの挙動を変更する?</Text>
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
