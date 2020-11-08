export const genObjectId = (): number => {
  const timestamp = (new Date().getTime() / 1000) | 0
  return timestamp + Math.random() * 16
}
