import { mock, mockReset } from 'jest-mock-extended'

import { ITabRepo } from '~/core/repos/tabRepo'
import { chromeActionService } from '~/core/services'
import { TabService } from '~/core/services/tabService'
import { TabList } from '~/core/shared/typings'
import { IChromeActionUseCase } from '~/core/useCase/chromeActionUseCase'
import { uniqueAllTabListTestDataBefore } from '~/test/fixtures/tabService/uniqueAllTabList'

const chromeActionServiceMock = jest.fn<IChromeActionUseCase, []>()

const allTabListData: TabList[] = [
  {
    id: 1,
    title: 'title1',
    description: '',
    tabs: [
      {
        id: 1,
        title: 'title1',
        description: 'description1',
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
  {
    id: 2,
    title: 'title2',
    description: '',
    tabs: [
      {
        id: 1,
        title: 'title2',
        description: 'description2',
        pinned: false,
        favorite: false,
        lastAccessed: 1630686258,
        url: 'https://github.com',
        favIconUrl: '',
        ogImageUrl: '',
        domain: 'github.com',
      },
    ],
    hasPinned: false,
    createdAt: 1630686258,
    updatedAt: 1630686258,
  },
]

describe('tabService', () => {
  const tabRepoMock = mock<ITabRepo>()

  beforeEach(() => {
    mockReset(tabRepoMock)
  })

  it('getAllTabList', async () => {
    const expected = allTabListData

    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(allTabListData))
    const chromeActionService = new chromeActionServiceMock()

    const tabService = new TabService(tabRepoMock, chromeActionService)
    const actual = await tabService.getAllTabList()

    expect(actual).toStrictEqual(expected)
    expect(tabRepoMock.getAllTabList).toBeCalled()
  })

  it('uniqueAllTabList', async () => {
    const before = uniqueAllTabListTestDataBefore

    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(before))
    tabRepoMock.setAllTabList.mockImplementation()

    const chromeActionService = new chromeActionServiceMock()
    const tabService = new TabService(tabRepoMock, chromeActionService)
    const hasProcessed = await tabService.uniqueAllTabList()

    expect(hasProcessed).toBeTruthy()
    expect(tabRepoMock.setAllTabList).toBeCalledWith(
      expect.not.objectContaining({
        id: 3,
        title: 'TabList Title',
        description: '',
        tabs: [
          {
            id: 5,
            title: 'tab title',
            description: '',
            pinned: false,
            favorite: false,
            lastAccessed: 1630686258,
            url: 'https://twitter.com',
            favIconUrl: '',
            ogImageUrl: '',
            domain: 'twitter.com',
          },
        ],
        hasPinned: false,
        createdAt: 1630686258,
        updatedAt: 1630686258,
      }),
    )
  })

  it('exportToText', async () => {
    const original = allTabListData

    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(original))

    const tabService = new TabService(tabRepoMock, chromeActionService)

    const result = await tabService.exportToText()
    // TODO: increase tab counts
    const actual = 'https://example.com | title1\n\nhttps://github.com | title2'
    expect(tabRepoMock.getAllTabList).toBeCalled()
    expect(result).toEqual(actual)
  })
})
