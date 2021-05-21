import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Tabs } from '~/ui/pages/Settings/components/Tabs'

describe('import json file', () => {
  test('show the import file name after the user uploaded file', () => {
    render(<Tabs deleteAllTabs={() => console.log('')} tabLists={[]} />)
    const inputEl = screen.getByLabelText(/JSONファイルを選択/i)
    const file = new File(['dummy'], 'import.json', { type: 'text/json' })

    userEvent.upload(inputEl, file)
    expect(screen.getByText(/import\.json/)).toBeInTheDocument()
  })
})
