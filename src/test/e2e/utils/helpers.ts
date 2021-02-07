import path from 'path'
import {PuppeteerNode} from 'puppeteer'

const extensionPath = path.join(__dirname, '../dist')

export const launchPuppeteerWithExtension = function (
  puppeteer: PuppeteerNode,
) {
  const options = {
    headless: true,
    ignoreHTTPSErrors: true,
    devtools: true,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  }

  return puppeteer.launch(options)
}
