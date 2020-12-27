import {Request, Response} from 'express'
import {Result} from 'url-metadata'
const urlMetadata = require('url-metadata')

type TargetMetadata = {imageUrl: string; description: string}

const pullMetadataFrom = (url: string): TargetMetadata =>
  urlMetadata(url).then((meta: Result) => {
    return {
      imageUrl: meta['og:image'],
      description: meta['description'],
    }
  })

const createMetadataObjs = (urls: string[]) => {
  return urls.map((url) => {
    const {imageUrl, description} = pullMetadataFrom(url)
    return {
      imageUrl,
      description,
    }
  })
}

export function getUrlMetadata(req: Request, res: Response<TargetMetadata[]>) {
  try {
    const {urls} = req.body
    const obj = createMetadataObjs(urls)

    res.status(200).send(obj)
  } catch (err) {
    res.status(500).send(err)
  }
}
