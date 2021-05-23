import {
  Button,
  ButtonDropdown,
  Card,
  Col,
  Divider,
  Grid,
  Row,
  Spacer,
  Text,
  Textarea,
  useToasts,
} from '@geist-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { exportToText, importFromText } from '~/shared/importExport'
import { TabList } from '~/shared/typings'
import { DeleteButton } from '~/ui/components/DeleteButton'
import { Spacing } from '~/ui/constants/styles'
import { useLocalStorage } from '~/ui/hooks'
import { tabListTotalCount } from '~/ui/stores/tabList'
import { tabListsState } from '~/ui/stores/tabLists'
import { exportedJSONFileName } from '~/ui/utils'

import { _Toggle, ToggleWrapper } from '../style'

type Props = { deleteAllTabs: () => void; tabLists: TabList[] }

export const Tabs: React.VFC<Props> = props => {
  // import/export
  const [exportText, setExportText] = useState('')
  const [showExportText, setShowExportText] = useState(false)
  const [importText, setImportText] = useState('')
  const [showImportText, setShowImportText] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  // localStorage
  const [isVisibleTabListMenu, setIsVisibleTabListMenu] = useLocalStorage('isVisibleTabListMenu', true)
  const [isVisibleTabListHeader, setIsVisibleTabListHeader] = useLocalStorage('isVisibleTabListHeader', true)
  const [shouldDeleteTabWhenClicked, setShouldDeleteTabWhenClicked] = useLocalStorage(
    'shouldDeleteTabWhenClicked',
    true,
  )

  const tabLists = useRecoilValue(tabListsState)
  const tabListIdexs = tabLists.map((_, index) => index)
  const tabCounts = tabListIdexs.map(index => useRecoilValue<number>(tabListTotalCount(index)))
  const totalTabCount = tabCounts.length >= 1 ? tabCounts.reduce((prev, cur) => prev + cur) : 0

  const handleUploadFile = (e: any) => setUploadedFileName(e.target.files[0].name)

  const { t } = useTranslation()
  const [, setToast] = useToasts()

  const handleClickExportButton = async () => {
    await exportToText()
      .then(text => setExportText(text))
      .then(() => {
        setShowExportText(!showExportText)
      })
      .catch(err => console.error(err))
  }

  // heavy processing
  const handleTextImport = async () => {
    await importFromText(importText)
      .then(() => setToast({ type: 'success', text: 'Successfully imported' }))
      .catch(() => setToast({ type: 'error', text: 'Error' }))
  }

  const hrefForJSONExport = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({ data: props.tabLists }),
  )}`

  return (
    <Grid.Container>
      <Card>
        <Card.Content>
          <Text h4>{t('TABS')}</Text>
        </Card.Content>

        <Divider y={0} />

        <Card.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Row gap={0.8}>
            <Col>
              <Text>{t('TOTAL_TAB')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                <Col>{totalTabCount}</Col>
              </Row>
            </Col>
          </Row>

          <Divider y={1} />

          <span>
            <ToggleWrapper>
              <_Toggle checked={isVisibleTabListMenu} onChange={e => setIsVisibleTabListMenu(e.target.checked)} />
              <Text>{t('SETTING_SHOW_TAB_GROUP_MENU')}</Text>
            </ToggleWrapper>
          </span>
          <span>
            <ToggleWrapper>
              <_Toggle checked={isVisibleTabListHeader} onChange={e => setIsVisibleTabListHeader(e.target.checked)} />
              <Text>{t('SETTING_SHOW_TAB_GROUP_COUNT')}</Text>
            </ToggleWrapper>
          </span>
          <span>
            <ToggleWrapper>
              <_Toggle
                checked={shouldDeleteTabWhenClicked}
                onChange={e => setShouldDeleteTabWhenClicked(e.target.checked)}
              />
              <Text>{t('SETTING_DELETE_TAB_WHEN_CLICKED')}</Text>
            </ToggleWrapper>
          </span>

          <Divider y={2} />

          <Row gap={0.8}>
            <Col>
              <Text>{t('SETTING_EXPORT')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                <Col>
                  <ButtonDropdown size="medium">
                    <ButtonDropdown.Item main onClick={handleClickExportButton}>
                      OneTab
                    </ButtonDropdown.Item>
                    <ButtonDropdown.Item>
                      <a href={hrefForJSONExport} download={exportedJSONFileName}>
                        JSON
                      </a>
                    </ButtonDropdown.Item>
                  </ButtonDropdown>
                </Col>
              </Row>
            </Col>
          </Row>

          {showExportText && <Textarea width="100%" initialValue={exportText} style={{ height: '300px' }} />}
          <Spacer y={2} />
          <Row gap={0.8}>
            <Col>
              <Text>{t('SETTING_IMPORT')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                <Col>
                  <ButtonDropdown size="medium">
                    <ButtonDropdown.Item main onClick={() => setShowImportText(!showImportText)}>
                      OneTab
                    </ButtonDropdown.Item>
                    {/* TODO */}
                    <ButtonDropdown.Item>
                      <label className="upload-file" style={{ cursor: 'pointer' }}>
                        JSON
                        <input
                          onChange={handleUploadFile}
                          type="file"
                          id="upload-file"
                          name="upload-file"
                          style={{ display: 'none', cursor: 'pointer' }}
                        />
                      </label>
                    </ButtonDropdown.Item>
                  </ButtonDropdown>
                </Col>
              </Row>
            </Col>
          </Row>
          {showImportText && (
            <div>
              <Textarea
                width="100%"
                initialValue={importText}
                style={{ height: '300px' }}
                onChange={e => setImportText(e.target.value)}
              />
              <div style={{ textAlign: 'right', paddingTop: Spacing['1'] }}>
                <Button size="medium" type="success" ghost onClick={handleTextImport}>
                  Import
                </Button>
              </div>
            </div>
          )}
          {uploadedFileName && <p>Importing {uploadedFileName}</p>}
          <Divider y={3} />
          <Text b>{t('DANGER_ZONE')}</Text>
          <Row gap={0.8}>
            <Col>
              <Text>{t('DANGER_ZONE_MESSAGE')}</Text>
            </Col>
            <Col>
              <Row align="middle" style={{ height: '100%', textAlign: 'right' }}>
                <Col>
                  <DeleteButton onClick={props.deleteAllTabs} label={t('DELETE_ALL_TABS_BUTTON')} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </Grid.Container>
  )
}
