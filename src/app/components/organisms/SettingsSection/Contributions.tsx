import { Button, Card, Text } from '@geist-ui/react'
import { Github } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BUY_ME_A_COFFEE, REPO_NAME } from '../../../constants/index'

export const Contributions: React.VFC = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('CONTRIBUTION')}</Text>
      </Card.Content>
      <Card.Content>
        <div style={{ display: 'flex' }}>
          <Button icon={<Github />} type="secondary">
            {REPO_NAME}
          </Button>

          <Button icon={<Github />} type="secondary" style={{ marginLeft: '12px' }}>
            {BUY_ME_A_COFFEE}
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
