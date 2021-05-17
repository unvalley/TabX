export const getNowYMD = () => {
  const dt = new Date()
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  return y + m + d
}

export const exportedJSONFileName = `TabX_${getNowYMD()}.json`
