import {getAllRandomTabLists} from '../../shared/storage'

export async function loadAllTabLists() {
  return await getAllRandomTabLists()
}

/**
 * writing test below
 */
// test('loads and displays tabLists', async () => {
//   render(<List />)
// })

// test('can search tab at List', () => {
//   const testData: TabLists = []
// })

// test('can reversed sort', async () => {
//   const testData = await loadAllTabLists()
//   const {findByText} = render(<Menu />)

//   fireEvent.click(await findByText(/sort/i))
// })
