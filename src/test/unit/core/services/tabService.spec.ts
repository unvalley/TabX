import { ITabRepo } from '~/core/repos/tabRepo'
import { TabService } from '~/core/services/tabService'
import { TabList } from '~/core/shared/typings'
import { IChromeActionUseCase } from '~/core/useCase/chromeActionUseCase'

const chromeActionServiceMock = jest.fn<IChromeActionUseCase, []>()

describe('tabService', () => {
  it('getAllTabList', async () => {
    const expected = [] as any

    const getAllTabListMock = jest.fn(
      async (): Promise<TabList[]> => {
        return []
      },
    )

    const setAllTabListMock = jest.fn((allTabList: TabList[]) => {
      console.log(allTabList)
    })
    const deleteAllTabListMock = jest.fn(() => {
      console.log('deleteAllTabListMock')
    })

    const tabRepoMock = jest.fn<ITabRepo, any>().mockImplementation(() => {
      return {
        getAllTabList: getAllTabListMock,
        setAllTabList: setAllTabListMock,
        deleteAllTabList: deleteAllTabListMock,
      }
    })

    const tabRepo = new tabRepoMock()
    const chromeActionService = new chromeActionServiceMock()

    const tabService = new TabService(tabRepo, chromeActionService)
    const actual = await tabService.getAllTabList()

    expect(actual).toStrictEqual(expected)
    expect(getAllTabListMock).toBeCalled()
  })
})
