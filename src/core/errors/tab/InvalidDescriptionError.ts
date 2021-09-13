export class InvalidDescriptionError extends Error {
  constructor() {
    super(`Over the limit description text length`)
    this.name = 'InvalidDescriptionError'
  }
}
