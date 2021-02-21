import { render } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { App } from '~/app/App'

describe('App.tsx', () => {
  test('renders App component', async () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    )
  })
})
