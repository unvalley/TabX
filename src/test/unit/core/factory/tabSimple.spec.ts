import { normalizeTab } from '~/core/factory/tabSimple'
import { FixutreTab } from '~/test/fixtures/tabOriginalData'

describe('tabSimple', () => {
  describe('normalizeTab', () => {
    it('should return undefined when tab.url is empty', () => {
      const tab = FixutreTab()
      const actual = normalizeTab(tab)
      expect(actual).toBeUndefined()
    })

    it('should create SimpleTab when tab.url exists', () => {
      const tab = FixutreTab('https://example.com')
      const actual = normalizeTab(tab)
      const expected = {
        id: 1,
        title: 'example',
        pinned: false,
        favorite: false,
        lastAccessed: tab.lastAccessed,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        ogImageUrl: '',
        description: '',
        domain: 'example.com',
      }

      expect(expected).toStrictEqual(actual)
    })
  })
})
