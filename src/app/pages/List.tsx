import React from 'react'
import {atom, useRecoilValue} from 'recoil'
import {getLists} from '../../shared/storage'
import {TabLists} from '../../shared/typings'
import {
  Input,
  Grid,
  Card,
  Pagination,
  Link,
  Image,
  useTheme,
  Row,
  Col,
  Text,
} from '@geist-ui/react'
import {useConfigs} from '../utils/config-context'
import {Image as ImageIcon} from '@geist-ui/react-icons'
import {Header} from '../components/Header'
import {LeftMenu} from '../components/LeftMenu'
import {FaviconImage} from '../components/FaviconImage'

const listsState = atom({
  key: 'lists',
  default: ['これだよ', 'これこれ'],
})

export const List: React.FC = () => {
  // TODO: create useDarkMode()
  const theme = useTheme()
  const configs: any = useConfigs()
  const isDark = React.useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = () => {
    configs.onChange(theme.type === 'dark')
  }

  const [tabLists, setTabLists] = React.useState<TabLists>([])
  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getLists()
      setTabLists(lists.reverse())
    }
    cleanup()
  }, [tabLists])

  //   const lists = useRecoilValue(listsState)
  return (
    <>
      <Grid.Container
        justify="center"
        style={{width: '800px', margin: '1.5% auto'}}
      >
        <Header />
        <Row gap={0.8}>
          <Col span={4}>
            <LeftMenu isDark={isDark} switchTheme={switchTheme} />
          </Col>
          <Col span={20}>
            <Grid.Container gap={2} justify="center">
              {tabLists.map((tabList) => (
                <React.Fragment key={tabList.createdAt}>
                  <Grid xs={24}>
                    <Card>
                      <Text h3 size="1.25rem">
                        {tabList.title}
                      </Text>
                      {tabList.tabs.map((tab) => (
                        <Row key={tab.id} gap={1} style={{display: 'flex'}}>
                          <Col span={2}>
                            {typeof tab.favIconUrl !== 'undefined' ? (
                              <FaviconImage src={tab.favIconUrl} />
                            ) : (
                              <ImageIcon />
                            )}
                          </Col>
                          <Col span={22}>
                            {/* TODO: クリックしたら削除するように実装 */}
                            <Link
                              color
                              target="_blank"
                              href={tab.url}
                              style={{wordBreak: 'break-all'}}
                            >
                              {tab.title}
                            </Link>
                          </Col>
                        </Row>
                      ))}
                    </Card>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid.Container>
            <Pagination count={20} initialPage={3} />
          </Col>
        </Row>
      </Grid.Container>
    </>
  )
}
