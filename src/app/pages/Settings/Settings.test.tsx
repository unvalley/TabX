import {fireEvent, render} from '@testing-library/react'
import React from 'react'
import {RecoilRoot} from 'recoil'
import {Settings} from '.'

test('display', () => {})

test('change colorTheme to Dark', () => {
  const {getByLabelText, getByText} = render(
    <RecoilRoot>
      <Settings />
    </RecoilRoot>,
  )
  const darkRadioButton = getByLabelText('Dark') as HTMLInputElement
  fireEvent.click(darkRadioButton)
  expect(darkRadioButton.value).toBe('Dark')
  //   fireEvent.change(darkRadioButton, {target: {value: Themes.DARK}})
})
