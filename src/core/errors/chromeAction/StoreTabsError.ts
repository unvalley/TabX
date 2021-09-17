export class StoreTabsError extends Error {
  constructor() {
    super(`Couldn't store tabs`)
    this.name = 'StoraTabsError'
  }
}
