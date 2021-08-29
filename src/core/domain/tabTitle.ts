import { omitText } from '../shared/utils'
import { ValueObject } from '../shared/utils/valueObject'

export class TabTitle extends ValueObject<string> {
  public omitTitle(length: number) {
    return omitText(this.val)(length)('…')
  }
}
