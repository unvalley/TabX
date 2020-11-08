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
import {Sun} from '../components/icons/sun'
import {Moon} from '../components/icons/moon'

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
        <Row gap={0.8}>
          <Col span={4}>
            <aside className="">
              <nav>
                <a href="#">
                  <Image
                    width={45}
                    height={45}
                    src={'https://storage.googleapis.com/bckett/tabX.png'}
                  />
                </a>
                <div>
                  {isDark && <Sun onClick={switchTheme} />}
                  {!isDark && <Moon onClick={switchTheme} />}
                </div>
              </nav>
            </aside>
          </Col>
          <Col span={20}>
            <section
              className="header"
              style={{display: 'flex', alignItems: 'center'}}
            >
              <section className="search">
                <Input placeholder="The Evil Rabbit" width="100%" />
              </section>
              <span>
                <a href="#">
                  <Sun />
                </a>
              </span>
            </section>
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
                            <Image
                              width={24}
                              height={24}
                              src={tab.favIconUrl}
                            />
                          </Col>
                          <Col span={22}>
                            {/* クリックしたら削除するように実装 */}
                            <Link
                              color
                              target="_blank"
                              href={tab.url}
                              style={{wordBreak: 'break-all'}}
                            >
                              {tab.title}
                            </Link>
                          </Col>
                          {/* <Col span={10}> */}
                          {/* </Col> */}
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
