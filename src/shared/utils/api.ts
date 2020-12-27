import {API_BASE_URL} from '../constants'
import {TargetMetaWithId} from '../typings'
import axios from 'axios'

/**
 *  send params by POST and get metadata by using the params.url
 */
export const acquireMetadata = async (params: {id: number; url: string}[]) => {
  const data = (await axios
    .post(API_BASE_URL + '/metadatas', {params})
    .then((res) => res.data)) as TargetMetaWithId[]
  return data
}
