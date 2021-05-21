// Validation for URLs
export const ILLEGAL_URLS = ['about:', 'wss:', 'ws:']
export const PICKED_TAB_PROPS = ['url', 'title', 'favIconUrl', 'pinned'] as const

export const DEFAULT_TITLE = 'untitled'

export const TAB_LISTS = 'tabLists'
export const DOMAIN_TAB_LISTS = 'domainTabLists'

// FIXME: deprecated url
export const API_BASE_URL = 'https://us-central1-tabx-572fb.cloudfunctions.net/api'

export const APP_NAME = 'TabX'

const TWITTER_TEXT = 'TabX saves your tab life'
const WEB_STORE_URL = 'https://chrome.google.com/webstore'
export const TWITTER_URL = `https://twitter.com/share?text=${TWITTER_TEXT}&url=${WEB_STORE_URL}`

export const DONATION_URL = ''
