import { RollGeneratorAdapter } from './roll-generator-adapter'
const sut = new RollGeneratorAdapter()

describe('Roll Generator Adapter', () => {
  test('Should return a roll result on success', async () => {
    const result = sut.generate('1d20')
    expect(result).toBeTruthy()
  })
})
