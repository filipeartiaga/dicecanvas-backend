import { MissingParamError, ServerError } from '../../errors'
import { UserModel, UserGetter, UserDecoder } from '../../protocols/user'
import { GetMyUserController } from './get-my-user'

const mockedDate = new Date(2000, 9, 1, 7)
jest.spyOn(global, 'Date').mockImplementation(() => {
  return mockedDate
})

const makeUserDecoderStub = (): UserDecoder => {
  class IUserDecoderStub implements UserDecoder {
    readonly secret: 'secret'
    decode (accessToken: string): string {
      return 'valid_id'
    }
  }
  return new IUserDecoderStub()
}

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
    async getById (id: string): Promise<UserModel | null> {
      return makeFakeUser()
    }

    async getByEmail (email: string): Promise<UserModel | null> {
      return makeFakeUser()
    }
  }
  return new UserGetterStub()
}

interface ISutTypes {
  sut: GetMyUserController
  userDecoderStub: UserDecoder
  userGetterStub: UserGetter
}

const makeSut = (): ISutTypes => {
  const userDecoderStub = makeUserDecoderStub()
  const userGetterStub = makeUserGetterStub()

  const sut = new GetMyUserController(
    userDecoderStub,
    userGetterStub
  )
  return {
    sut,
    userDecoderStub,
    userGetterStub
  }
}

describe('Edit User', () => {
  test('Should return 400 if headers are not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        userSettings: {
          autoScroll: true
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('access-token'))
  })

  test('Should return 400 if accessToken is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
      },
      body: {
        userSettings: {
          autoScroll: true
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('access-token'))
  })

  test('Should call user getter with correct id', async () => {
    const { sut, userGetterStub } = makeSut()
    const getByIdSpy = jest.spyOn(userGetterStub, 'getById')
    const httpRequest = {
      headers: {
        'access-token': 'valid_token'
      },
      body: {
        userSettings: {
          autoScroll: true
        }
      }
    }
    await sut.handle(httpRequest)
    expect(getByIdSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 401 if user is not found', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getById').mockReturnValueOnce(null)
    const httpRequest = {
      headers: {
        'access-token': 'valid_token'
      },
      body: {
        userSettings: {
          autoScroll: true
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
  })

  test('Should return 500 if user getter throws', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        _id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if user is found', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        userSettings: {
          autoScroll: true
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      _id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      role: 'valid_role',
      isVerified: true,
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })
  })
})
