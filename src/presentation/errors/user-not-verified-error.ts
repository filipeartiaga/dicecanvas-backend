export class UserNotVerifiedError extends Error {
  constructor () {
    super('User not verified')
    this.name = 'User not verified'
  }
}
