declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'

    readonly REACT_APP_API_BASE_URL: string
  }
}

declare namespace chrome {
  namespace action {
    export interface TabChangeInfo {
      status?: string
      pinned?: boolean
    }
    export interface BrowserClickedEvent extends chrome.events.Event<(tab: chrome.tabs.Tab) => void> {}
    export const onClicked: BrowserClickedEvent
  }
}
