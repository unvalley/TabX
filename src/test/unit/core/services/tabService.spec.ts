import { mock, mockReset } from 'jest-mock-extended'

import { ITabRepo } from '~/core/repos/tabRepo'
import { TabService } from '~/core/services/tabService'
import { allTabListData } from '~/test/fixtures/tabListData'
import { uniqueAllTabListTestDataBefore } from '~/test/fixtures/tabService/uniqueAllTabList'

describe('tabService', () => {
  const tabRepoMock = mock<ITabRepo>()

  beforeEach(() => {
    mockReset(tabRepoMock)
  })

  it('getAllTabList', async () => {
    const expected = allTabListData
    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(allTabListData))
    const tabService = new TabService(tabRepoMock)
    const actual = await tabService.getAllTabList()

    expect(actual).toStrictEqual(expected)
    expect(tabRepoMock.getAllTabList).toBeCalled()
  })

  it('uniqueAllTabList', async () => {
    const before = uniqueAllTabListTestDataBefore

    tabRepoMock.getAllTabList.mockReturnValue(Promise.resolve(before))
    tabRepoMock.setAllTabList.mockImplementation()

    const tabService = new TabService(tabRepoMock)
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

    const tabService = new TabService(tabRepoMock)

    const actual = await tabService.exportToText()
    // TODO: increase tab counts
    const expected = 'https://example.com | title1\n\nhttps://github.com | title2'
    expect(tabRepoMock.getAllTabList).toBeCalled()
    expect(actual).toEqual(expected)
  })
})
