import { UserModel } from 'src/domain/models/user/user'
import { UserDecoder, UserGetter } from 'src/presentation/protocols/user'
import { AuthenticatedValidatorAdapter } from './authenticated-validator-adapter'

const makeFakeUser = (): UserModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  role: 'valid_role',
  password: 'valid_password',
  isVerified: true,
  passwordResetToken: 'valid_token',
  passwordResetExpires: new Date(),
  firstAccessToken: 'valid_token',
  userSettings: {
    autoScroll: true
  },
  createdAt: new Date()
})

const makeUserGetterStub = (): UserGetter => {
  class UserGetterStub implements UserGetter {
    async getById (_id: string): Promise<UserModel> {
      return makeFakeUser()
    }

    async getByEmail (email: string): Promise<UserModel> {
      return makeFakeUser()
    }
  }
  return new UserGetterStub()
}

const makeUserDecoderStub = (): UserDecoder => {
  class IUserDecoderStub implements UserDecoder {
    readonly secret: 'secret'
    decode (accessToken: string): string {
      return 'valid_id'
    }
  }
  return new IUserDecoderStub()
}

interface SutTypes {
  sut: AuthenticatedValidatorAdapter
  userGetterStub: UserGetter
  userDecoderStub: UserDecoder
}

const makeSut = (): SutTypes => {
  const userGetterStub = makeUserGetterStub()
  const userDecoderStub = makeUserDecoderStub()
  const sut = new AuthenticatedValidatorAdapter(userGetterStub, userDecoderStub)
  return {
    sut,
    userGetterStub,
    userDecoderStub
  }
}

describe('AuthenticatedValidator Adapter', () => {
  test('Should return false if no access token is provided', async () => {
    const { sut } = makeSut()
    const isValid = await sut.isAuthenticated('')
    expect(isValid).toBe(false)
  })

  test('Should call UserDecoder with correct accessToken', async () => {
    const { sut, userDecoderStub } = makeSut()
    const decodeSpy = jest.spyOn(userDecoderStub, 'decode')
    await sut.isAuthenticated('valid_token')
    expect(decodeSpy).toHaveBeenCalledWith('valid_token')
  })

  test('Should call UserGetter with correct valeus', async () => {
    const { sut, userGetterStub } = makeSut()
    const getByIdSpy = jest.spyOn(userGetterStub, 'getById')
    await sut.isAuthenticated('valid_token')
    expect(getByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return false if UserGetter returns null', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getById').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(null)
      })
    )
    const isValid = await sut.isAuthenticated('valid_token')
    expect(isValid).toBe(false)
  })

  test('Should return true if user is authenticated', async () => {
    const sut = new AuthenticatedValidatorAdapter(
      makeUserGetterStub(),
      makeUserDecoderStub()
    )
    const isValid = await sut.isAuthenticated('valid_token')
    expect(isValid).toBe(true)
  })
})
