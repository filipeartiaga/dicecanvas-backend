export class RegisteredParmError extends Error {
  constructor (paramName: string) {
    super(`Registered param: ${paramName}`)
    this.name = 'User already registered with email'
  }
}
