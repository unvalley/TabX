export class CloseTabsError extends Error {
  constructor(err: any) {
    super(`Couldn't close tabs: ${err.message}`)
    this.name = 'StoraTabsError'
  }
}
