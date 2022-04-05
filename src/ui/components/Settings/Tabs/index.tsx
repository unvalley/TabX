import { Button, ButtonDropdown, Card, Col, Divider, Row, Spacer, Text, Textarea, useToasts } from '@geist-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { tabService } from '~/core/services'
import { TabList } from '~/core/shared/typings'
import { DeleteButton } from '~/ui/components/DeleteButton'
import { STORAGE_KEYS } from '~/ui/constants'
import { Spacing } from '~/ui/constants/styles'
import { useLocalStorage } from '~/ui/hooks'
import { totalTabCountSelector } from '~/ui/stores/tabList'
import { exportedJSONFileName } from '~/ui/utils'

import { _Toggle, ToggleWrapper } from '../style'

const useExport = () => {
  const [exportText, setExportText] = useState('')
  const [showExportText, setShowExportText] = useState(false)

  const executeExportForOneTab = async () => {
    await tabService
      .exportToText()
      .then(text => setExportText(text))
      .then(() => {
        setShowExportText(!showExportText)
      })
      .catch(err => console.error(err))
  }
  return { executeExportForOneTab, exportText, showExportText }
}

const useImport = () => {
  const [importText, setImportText] = useState('')
  const [, setToast] = useToasts()
  const { t } = useTranslation()

  // maybe heavy processing
  const executeImportForOneTab = async () => {
    await tabService
      .importFromText(importText)
      .then(() => setToast({ type: 'success', text: t('IMPORT_SUCCESS') }))
      .catch(() => setToast({ type: 'error', text: t('IMPORT_ERROR') }))
  }
  return { executeImportForOneTab, importText, setImportText }
}

type Props = { deleteAllTabs: () => void; tabLists: TabList[]; backgroundColor?: string }

export const Tabs: React.VFC<Props> = props => {
  const { t } = useTranslation()

  const totalTabCount = useRecoilValue(totalTabCountSelector)
  const [showImportText, setShowImportText] = useState(false)

  const { executeExportForOneTab, exportText, showExportText } = useExport()
  const { executeImportForOneTab, importText, setImportText } = useImport()

  // localStorage
  const [isVisibleTabListHeader, setIsVisibleTabListHeader] = useLocalStorage(
    STORAGE_KEYS.IS_VISIBLE_TAB_LIST_HEADER,
    true,
  )
  const [shouldDeleteTabWhenClicked, setShouldDeleteTabWhenClicked] = useLocalStorage(
    STORAGE_KEYS.SHOULD_DELETE_TAB_WHEN_CLICKED,
    false,
  )

  const hrefForJSONExport = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({ data: props.tabLists }),
  )}`

  return (
    <Card style={{ backgroundColor: props.backgroundColor }}>
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
                  <ButtonDropdown.Item main onClick={executeExportForOneTab}>
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
                  <ButtonDropdown.Item disabled>
                    JSON (WIP)
                    {/* <label className="upload-file" style={{ cursor: 'pointer' }}>
                        JSON
                        <input
                          onChange={handleUploadFile}
                          type="file"
                          id="upload-file"
                          name="upload-file"
                          style={{ display: 'none', cursor: 'pointer' }}
                        />
                      </label> */}
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
              <Button size="medium" type="success" ghost onClick={executeImportForOneTab}>
                Import
              </Button>
            </div>
          </div>
        )}
        {/* {uploadedFileName && <p>Importing {uploadedFileName}</p>} */}
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
  )
}
