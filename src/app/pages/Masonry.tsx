import { Card, Image, Link, Text } from '@geist-ui/react'
import { Masonry as MasonicMasonry } from 'masonic'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { tabListsState } from '~/app/stores/tabLists'
import { TabList, TabWithMeta } from '../../shared/typings'
import { omitText } from '../../shared/utils/util'

export const Masonry: React.FC = () => {
  const tabLists = useRecoilValue<TabList[]>(tabListsState)
  const [flat, setFlat] = React.useState<TabWithMeta[]>([])

  useEffect(() => {
    const allTabs = tabLists.map(tabListElem => tabListElem.tabs) as TabWithMeta[][]
    const tmp = [] as TabWithMeta[]
    setFlat(tmp.concat(...allTabs))
  }, [])

  return <MasonicMasonry columnGutter={6} columnWidth={200} overscanBy={2} items={flat} render={TabCard} />
}

const TabCard = React.memo((props: { index: number; data: TabWithMeta; width: number }) => {
  return (
    <Card hoverable>
      <Image src={props.data.ogImageUrl} style={{ objectFit: 'cover' }} />
      <Link href={props.data.url} target="_blank" style={{ wordBreak: 'break-all' }}>
        <Text h5 style={{ marginBottom: '0' }}>
          {props.data.title}
        </Text>
      </Link>
      {props.data.description && (
        <span style={{ margin: '10px 0', fontSize: '8px' }}>{omitText(props.data.description)(50)('...')}</span>
      )}
    </Card>
  )
})
TabCard.displayName = 'TabCard'
