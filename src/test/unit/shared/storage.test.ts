const browser = require('sinon-chrome/extensions')

describe('test storage', () => {
  beforeAll(() => {
    // @ts-ignore
    global.browser = browser
  })

  beforeEach(() => {
    browser.flush()
  })

  it('', () => {})

  afterAll(() => {
    browser.flush()
    // @ts-ignore
    delete global.browser
  })
})
