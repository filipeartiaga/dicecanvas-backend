import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('Email Validator Adapter', () => {
  test('Should return true if validator is valid mail returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValidExitlagMail('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should return false if validator is valid mail returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValidExitlagMail('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator is valid returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should return false if validator is valid returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
