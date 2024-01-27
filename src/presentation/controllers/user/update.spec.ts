import { MissingParamError, ServerError } from '../../errors'
import { UserModel, UserUpdater, UserGetter, UserDecoder } from '../../protocols/user'
import { UpdateUserController } from './update'

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

const makeUserUpdaterStub = (): UserUpdater => {
  class UserUpdaterStub implements UserUpdater {
    async update (user: UserModel): Promise<UserModel> {
      return makeFakeUser()
    }
  }
  return new UserUpdaterStub()
}

interface ISutTypes {
  sut: UpdateUserController
  userDecoderStub: UserDecoder
  userGetterStub: UserGetter
  updaterUserStub: UserUpdater
}

const makeSut = (): ISutTypes => {
  const userDecoderStub = makeUserDecoderStub()
  const userGetterStub = makeUserGetterStub()
  const updaterUserStub = makeUserUpdaterStub()

  const sut = new UpdateUserController(
    userDecoderStub,
    userGetterStub,
    updaterUserStub
  )
  return {
    sut,
    userDecoderStub,
    userGetterStub,
    updaterUserStub
  }
}

describe('Edit User', () => {
  test('Should return 400 if accessToken is not provided', async () => {
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

  test('Should call user updater with correct user', async () => {
    const { sut, updaterUserStub } = makeSut()
    const updateSpy = jest.spyOn(updaterUserStub, 'update')
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
    expect(updateSpy).toHaveBeenCalledWith(makeFakeUser())
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

  test('Should return 500 if user updater throws', async () => {
    const { sut, updaterUserStub } = makeSut()
    jest.spyOn(updaterUserStub, 'update').mockImplementationOnce(() => {
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

  test('Should return 200 if user is updated', async () => {
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
