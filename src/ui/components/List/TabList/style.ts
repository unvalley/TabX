import { Row } from '@geist-ui/react'
import styled from 'styled-components'

export const TabListWrapper = styled.div`
  width: 100%;
  min-width: 80%;
`

export const _Row = styled(Row).attrs({
  component: 'span',
})`
  padding-left: 100px !important;
  margin-left: -100px !important;
  width: calc(100% + 100px);
`
export const HoveredMenu = styled.div`
  margin-left: -100px;
  float: left;
  width: 100px;
  text-align: right;
  vertical-align: top;
`
