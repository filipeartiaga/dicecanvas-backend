import { UserModel } from 'src/domain/models/user/user'
import { UserDecoder, UserGetter } from 'src/presentation/protocols/user'
import { AdminValidatorAdapter } from './admin-validator-adapter'

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

const makeFakeAdminUser = (): UserModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  role: 'admin',
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

const makeAdminUserGetterStub = (): UserGetter => {
  class UserGetterStub implements UserGetter {
    async getById (_id: string): Promise<UserModel> {
      return makeFakeAdminUser()
    }

    async getByEmail (email: string): Promise<UserModel> {
      return makeFakeAdminUser()
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
  sut: AdminValidatorAdapter
  userGetterStub: UserGetter
  userDecoderStub: UserDecoder
}

const makeSut = (): SutTypes => {
  const userGetterStub = makeUserGetterStub()
  const userDecoderStub = makeUserDecoderStub()
  const sut = new AdminValidatorAdapter(userGetterStub, userDecoderStub)
  return {
    sut,
    userGetterStub,
    userDecoderStub
  }
}

describe('AdminValidator Adapter', () => {
  test('Should return false if no access token is provided', async () => {
    const { sut } = makeSut()
    const isValid = await sut.isAdmin('')
    expect(isValid).toBe(false)
  })

  test('Should call UserDecoder with correct accessToken', async () => {
    const { sut, userDecoderStub } = makeSut()
    const decodeSpy = jest.spyOn(userDecoderStub, 'decode')
    await sut.isAdmin('valid_token')
    expect(decodeSpy).toHaveBeenCalledWith('valid_token')
  })

  test('Should call UserGetter with correct valeus', async () => {
    const { sut, userGetterStub } = makeSut()
    const getByIdSpy = jest.spyOn(userGetterStub, 'getById')
    await sut.isAdmin('valid_token')
    expect(getByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return false if UserGetter returns null', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getById').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(null)
      })
    )
    const isValid = await sut.isAdmin('valid_token')
    expect(isValid).toBe(false)
  })

  test('Should return false if user role is not admin', async () => {
    const { sut } = makeSut()
    const isValid = await sut.isAdmin('valid_token')
    expect(isValid).toBe(false)
  })

  test('Should return true if user role is admin', async () => {
    const sut = new AdminValidatorAdapter(
      makeAdminUserGetterStub(),
      makeUserDecoderStub()
    )
    const isValid = await sut.isAdmin('valid_token')
    expect(isValid).toBe(true)
  })
})
