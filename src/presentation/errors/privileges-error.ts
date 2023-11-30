export class PrivilegesError extends Error {
  constructor () {
    super('User not allowed to perform this action')
    this.name = 'User not allowed to perform this action'
  }
}
