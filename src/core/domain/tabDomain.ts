import { ValueObject } from '../shared/utils/valueObject'

export class TabDomain extends ValueObject<string> {
  constructor(val?: string) {
    const res = val?.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    if (res === null || res === undefined) throw new Error('')
    const domain = res[1]
    super(domain)
  }
}
