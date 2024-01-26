import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt hash method with correct values', async () => {
    const salt = 12
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = new BcryptAdapter(salt)
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should call bcrypt compare method with correct values', async () => {
    const salt = 12
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    const sut = new BcryptAdapter(salt)
    await sut.compare('any_value', 'any_hash')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true if bcrypt compare succeeds', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => await Promise.resolve(true))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt compare fails', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => await Promise.resolve(false))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => await Promise.resolve('hashed_value'))
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if bcrypt compare throws', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => { await Promise.reject(new Error()) })
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if bcrypt hash throws', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => { await Promise.reject(new Error()) })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
