import {Button, Card, Divider, Row, Text} from '@geist-ui/react'
import React from 'react'
import {Github} from '@geist-ui/react-icons'
import {useTranslation} from 'react-i18next'

export const Contributions: React.VFC = (props) => {
  const [t, i18n] = useTranslation()

  const REPO_NAME = 'ia17011/TabX'
  const BUY_ME_A_COFFEE = 'Buy me a Coffee'

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('CONTRIBUTION')}</Text>
      </Card.Content>
      <Card.Content>
        <div style={{display: 'flex'}}>
          <Button icon={<Github />} type="secondary">
            {REPO_NAME}
          </Button>

          <Button
            icon={<Github />}
            type="secondary"
            style={{marginLeft: '12px'}}
          >
            {BUY_ME_A_COFFEE}
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
