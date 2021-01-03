import {Card, Image, Link, Text} from '@geist-ui/react'
import {Masonry as MasonicMasonry} from 'masonic'
import React from 'react'
import {TabLists, TabWithMeta} from '../../../shared/typings'
import {omitText} from '../../utils'

type Props = {
  tabLists: TabLists
}

export const Masonry: React.FC<Props> = (props) => {
  const [flat, setFlat] = React.useState<TabWithMeta[]>([])

  React.useEffect(() => {
    const allTabs = props.tabLists.map(
      (tabListElem) => tabListElem.tabs,
    ) as TabWithMeta[][]
    const tmp = [] as TabWithMeta[]
    setFlat(tmp.concat(...allTabs))
  }, [])

  return (
    <MasonicMasonry
      columnGutter={6}
      columnWidth={200}
      overscanBy={2}
      items={flat}
      render={TabCard}
    />
  )
}

const TabCard = React.memo(
  (props: {index: number; data: TabWithMeta; width: number}) => {
    return (
      <Card hoverable>
        <Image src={props.data.ogImageUrl} style={{objectFit: 'cover'}} />
        <Link
          href={props.data.url}
          target="_blank"
          style={{wordBreak: 'break-all'}}
        >
          <Text h5 style={{marginBottom: '0'}}>
            {props.data.title}
          </Text>
        </Link>
        {props.data.description && (
          <span style={{margin: '10 0', fontSize: '8px'}}>
            {omitText(props.data.description)(50)('...')}
          </span>
        )}
      </Card>
    )
  },
)
