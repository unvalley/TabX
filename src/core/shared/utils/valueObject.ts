export abstract class ValueObject<T> {
  protected constructor(protected readonly val: T) {}

  get(): T {
    return this.val
  }

  equals(vo: ValueObject<T>): boolean {
    if (this.constructor.name !== vo.constructor.name) return false
    return this.get() === vo.get()
  }
}
