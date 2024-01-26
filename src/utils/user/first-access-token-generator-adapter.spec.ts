import { FirstAccessTokenGeneratorAdapter } from './first-access-token-generator-adapter'

describe('First Access Token Generator Adapter', () => {
  test('Should return a token with same length as parameter passed on success', async () => {
    const amount = 4
    const sut = new FirstAccessTokenGeneratorAdapter()
    const token = sut.generate(amount)
    expect(token.length).toBe(amount)
  })

  test('Should return a token on success', async () => {
    const sut = new FirstAccessTokenGeneratorAdapter()
    const token = sut.generate(4)
    expect(token).toBeTruthy()
  })
})
