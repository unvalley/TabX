import puppeteer from 'puppeteer'

import { launchPuppeteerWithExtension } from './utils/helpers'

describe('install', () => {
  test('it installs the extension', async () => {
    const browser = await launchPuppeteerWithExtension(puppeteer)
    expect(browser).toBeTruthy()
    browser.close()
  }, 5000)
})
