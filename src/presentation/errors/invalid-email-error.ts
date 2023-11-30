export class InvalidEmailError extends Error {
  constructor () {
    super('Email needs to be a valid email')
    this.name = 'Email needs to be a valid email'
  }
}
