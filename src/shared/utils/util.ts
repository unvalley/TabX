export const genObjectId = (): number => {
  const timestamp = (new Date().getTime() / 1000) | 0
  return timestamp + Math.random() * 16
}

export const zip = <T, U>(arr1: T[], arr2: U[]) =>
  arr1.map((_, i) => [arr1[i], arr2[i]] as [T, U])
