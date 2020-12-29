import React from 'react'
import {Card, Image, Text, Link} from '@geist-ui/react'
import {TabLists, TabWithMeta} from '../../../shared/typings'
import {Tabs} from 'webextension-polyfill-ts'
import {Masonry as MasonicMasonry} from 'masonic'

type Props = {
  tabLists: TabLists
}

export const Masonry: React.FC<Props> = (props) => {
  const [flat, setFlat] = React.useState<(Tabs.Tab | TabWithMeta)[]>([])

  React.useEffect(() => {
    const allTabs = props.tabLists.map((tab) => tab.tabs)
    const tmp = [] as (Tabs.Tab | TabWithMeta)[]
    setFlat(tmp.concat(...allTabs))
  }, [])

  return (
    <MasonicMasonry
      columnGutter={6}
      columnWidth={200}
      overscanBy={2}
      items={flat}
      render={FakeCard}
    />
  )
}

const omitText = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const FakeCard = (props: {index: number; data: any; width: number}) => {
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
}
