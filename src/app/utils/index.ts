export const openDonation = () => {
  const url = 'https://www.buymeacoffee.com/kirohi'
  window.open(url)
}

export const shareTwitter = () => {
  const text = 'TabX saves your tab life'
  const webstoreUrl = 'https://chrome.google.com/webstore'
  const url = `https://twitter.com/share?text=${text}&url=${webstoreUrl}`
  window.open(url)
}

export const getNowYMD = () => {
  const dt = new Date()
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  return y + m + d
}

export const exportedJSONFileName = `TabX_${getNowYMD()}.json`
