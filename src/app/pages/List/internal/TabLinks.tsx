import {Col, Link, Row} from '@geist-ui/react'
import {Image as ImageIcon} from '@geist-ui/react-icons'
import React from 'react'
import {FaviconImage} from '../../../components/FaviconImage'
import {Tabs} from 'webextension-polyfill-ts'

type Props = {tabs: Tabs.Tab[]}

export const TabLinks: React.FC<Props> = ({tabs}) => {
  const deleteTab = (id?: number) => {
    console.log(id, 'を削除')
  }
  return (
    <>
      {tabs.map((tab) => (
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
            {/* TODO: allow関数修正 */}
            <Link
              color
              target="_blank"
              href={tab.url}
              onClick={() => deleteTab(tab.id!)}
              style={{wordBreak: 'break-all'}}
            >
              {tab.title}
            </Link>
          </Col>
        </Row>
      ))}
    </>
  )
}
