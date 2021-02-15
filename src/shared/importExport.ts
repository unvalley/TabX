import { TAB_LISTS } from './constants'
import { createNewTabListFromImport, normalizeUrlText } from './list'
import * as Storage from './storage'
import { ImportedUrlObj } from './typings'

export const exportToText = async () => {
  const lists = await Storage.getAllLists(TAB_LISTS)
  return lists.map(list => list.tabs.map(tab => tab.url + ' | ' + tab.title).join('\n')).join('\n\n')
}

const genImportedUrlObj = (singleLine: string): ImportedUrlObj => {
  const urlAndTitle = singleLine.split('|')
  return { url: urlAndTitle[0], title: urlAndTitle[1] }
}

const createImportedUrlObjs = (singleLines: string[]) => {
  const res: ImportedUrlObj[][] = [[]]
  const isEmptyLine = (s: string) => s === ''
  singleLines.forEach(singleLine => {
    const urlObj = genImportedUrlObj(singleLine)
    isEmptyLine(singleLine) ? res.push([]) : res[res.length - 1].push(urlObj)
  })
  return res
}

export const importFromText = async (urlText: string) => {
  const singleLines = urlText.split('\n')
  const urlObjStore = createImportedUrlObjs(singleLines)
  const tabs = urlObjStore.map(urlObjs => urlObjs.map(urlObj => normalizeUrlText(urlObj)))
  const res = tabs.map(tab => createNewTabListFromImport(tab))
  await Storage.addLists(TAB_LISTS, res)
}
