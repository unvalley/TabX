import { ImportedUrlObj } from '../typings'
export const createImportedUrlObjs = (singleLines: string[]) => {
  const res: ImportedUrlObj[][] = [[]]
  const isEmptyLine = (s: string) => s === ''

  singleLines.forEach(singleLine => {
    const urlObj = genImportedUrlObj(singleLine)
    isEmptyLine(singleLine) ? res.push([]) : res[res.length - 1].push(urlObj)
  })
  return res
}

const genImportedUrlObj = (singleLine: string): ImportedUrlObj => {
  const urlAndTitle = singleLine.split('|')
  return { url: urlAndTitle[0], title: urlAndTitle[1] }
}
