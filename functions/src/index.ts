import * as cors from 'cors'
import * as express from 'express'
import * as functions from 'firebase-functions'
import * as normalizeUrl from 'normalize-url'
import { Result } from 'url-metadata'
const urlMeta = require('url-metadata')

type TargetMeta = { ogImageUrl: string; description: string }
type TargetMetaWithId = TargetMeta & { id: number }
type Param = { id: number; url: string }

const isValidOgImageUrl = (ogImageUrl: string) => !ogImageUrl.startsWith('/')
const extractUntilFQDN = (url: string) =>
  normalizeUrl(url, {
    stripHash: true,
  })

const pullMeta = async (param: Param): Promise<TargetMetaWithId> => {
  try {
    const meta = (await urlMeta(param.url)) as Result
    const convertOgImageUrl = (ogImageUrl: string) => {
      const convUrl = extractUntilFQDN(meta['url']) + ogImageUrl
      return convUrl
    }

    return {
      id: param.id,
      ogImageUrl: isValidOgImageUrl(meta['og:image']) ? meta['og:image'] : convertOgImageUrl(meta['og:image']),
      description: meta['description'],
    } as TargetMetaWithId
  } catch (err) {
    console.error(err)
    return err
  }
}

const createMetaObjs = async (params: Param[]) => {
  const promises = params.map(param => {
    return pullMeta(param)
  })
  const metaObjs = await Promise.all(promises).then(res => res)
  return metaObjs
}

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/metadatas', async (req, res) => {
  try {
    const obj = await createMetaObjs(req.body.params as Param[])
    res.status(200).send(obj)
  } catch (err) {
    res.status(500).send(err)
  }
})

const api = functions.https.onRequest(app)
module.exports = { api }
