import { ValueObject } from '../shared/utils/valueObject'

export class TabUrl extends ValueObject<string> {
  constructor(val?: string) {
    super(val ?? '')
  }
}
