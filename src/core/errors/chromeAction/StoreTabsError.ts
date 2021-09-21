export class StoreTabsError extends Error {
  constructor(err: any) {
    super(`Couldn't store tabs: ${err.message}`)
    this.name = 'StoraTabsError'
  }
}
