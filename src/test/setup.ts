import chrome from 'sinon-chrome'

export const fixChromeWebextensionPolyfill = () => {
  if (!chrome.runtime) chrome.runtime = {} as any
  if (!chrome.runtime.id) chrome.runtime.id = 'tabX'
}

fixChromeWebextensionPolyfill()
;(global as any).chrome = chrome
