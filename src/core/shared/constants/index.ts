// Validation for URLs
export const ILLEGAL_URLS = ['about:', 'wss:', 'ws:', 'chrome:']
export const PICKED_TAB_PROPS = ['url', 'title', 'favIconUrl', 'pinned'] as const

export const DEFAULT_TITLE = 'untitled'
export const TAB_LISTS = 'tabLists'
export const APP_NAME = 'TabX'

const TWITTER_TEXT = 'TabX saves your tab life'
const WEB_STORE_URL = 'https://chrome.google.com/webstore/detail/tabx/pnomgepiknocmkmncjkcchojfiookljb?hl=ja'
export const TWITTER_URL = `https://twitter.com/share?text=${TWITTER_TEXT}&url=${WEB_STORE_URL}`

export const FEEDBACK_URL = 'https://github.com/unvalley/TabX/discussions'
export const DONATION_URL = ''

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
