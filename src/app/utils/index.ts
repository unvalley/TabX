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
