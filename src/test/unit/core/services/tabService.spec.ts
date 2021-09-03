import { mock } from 'jest-mock-extended'

import { ITabRepo } from '~/core/repos/tabRepo'
import { TabService } from '~/core/services/tabService'
import { TabList } from '~/core/shared/typings'
import { IChromeActionUseCase } from '~/core/useCase/chromeActionUseCase'

const chromeActionServiceMock = jest.fn<IChromeActionUseCase, []>()

const allTabListData: TabList[] = [
  {
    id: 1,
    title: 'TabList Title',
    description: '',
    tabs: [
      {
        id: 1,
        title: 'first tab title',
        description: '',
        pinned: false,
        favorite: false,
        lastAccessed: 1630686258,
        url: 'https://example.com',
        favIconUrl: '',
        ogImageUrl: '',
        domain: 'example.com',
      },
    ],
    hasPinned: false,
    createdAt: 1630686258,
    updatedAt: 1630686258,
  },
]

describe('tabService', () => {
  it('getAllTabList', async () => {
    const expected = allTabListData

    const tabRepoMock = mock<ITabRepo>()
    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(allTabListData))
    const chromeActionService = new chromeActionServiceMock()

    const tabService = new TabService(tabRepoMock, chromeActionService)
    const actual = await tabService.getAllTabList()

    expect(actual).toStrictEqual(expected)
    expect(tabRepoMock.getAllTabList).toBeCalled()
  })
})
