export const genObjectId = (): number => {
  const timestamp = (new Date().getTime() / 1000) | 0
  return timestamp + Math.random() * 16
}

/**
 * TODO: ちゃんと実装する
 * @param url
 */
export const getOGPImage = (url: string) => {
  fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const el = new DOMParser().parseFromString(text, 'text/html')
      const headEls = el.head.children
      Array.from(headEls).map((v) => {
        const prop = v.getAttribute('property')
        if (!prop) return
        console.log(prop, v.getAttribute('content'))
      })
    })
}
