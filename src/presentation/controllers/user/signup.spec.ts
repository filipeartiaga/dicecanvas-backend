import { UserModel } from '../../../domain/models/user/user'
import { AddUser, AddUserModel } from '../../../domain/usescases/user/add-user'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { InvalidEmailError, MissingParamError, RegisteredParmError, ServerError } from '../../errors'
import { EmailValidator, FirstAccessEmailSender, FirstAccessTokenGenerator, UserAdder, UserGetter, UserSigner } from '../../protocols/user'
import { SignUpController } from './signup'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }

    isValidExitlagMail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeFirstAccessTokenGenerator = (): FirstAccessTokenGenerator => {
  class FirstAccessTokenGeneratorStub implements FirstAccessTokenGenerator {
    generate (length: number): string {
      return 'valid_token'
    }
  }
  return new FirstAccessTokenGeneratorStub()
}

const makeFirstAccessEmailSender = (): FirstAccessEmailSender => {
  class FirstAccessEmailSenderStub implements FirstAccessEmailSender {
    async sendMail (email: string, firstAccessToken: string): Promise<any> {
      return await new Promise((resolve) => {
        resolve('ok')
      })
    }
  }
  return new FirstAccessEmailSenderStub()
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

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (account: AddUserModel): Promise<UserModel> {
      const fakeUser = makeFakeUser()
      return await new Promise((resolve) => {
        resolve(fakeUser)
      })
    }
  }
  return new AddUserStub()
}

const makeUserSigner = (): UserSigner => {
  class UserSignerStub implements UserSigner {
    secret: string
    sign (user: UserModel): string {
      return 'valid_token'
    }
  }
  return new UserSignerStub()
}

const makeUserGetterStub = (): UserGetter => {
  class UserGetterStub implements UserGetter {
    async getById (_id: string): Promise<UserModel | null> {
      return null
    }

    async getByEmail (email: string): Promise<UserModel | null> {
      return null
    }
  }
  return new UserGetterStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  firstAccessTokenGeneratorStub: FirstAccessTokenGenerator
  firstAccessEmailSenderStub: FirstAccessEmailSender
  userAdderStub: UserAdder
  userGetterStub: UserGetter
  userSignerStub: UserSigner
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const firstAccessTokenGeneratorStub = makeFirstAccessTokenGenerator()
  const firstAccessEmailSenderStub = makeFirstAccessEmailSender()
  const userAdderStub = makeAddUser()
  const userGetterStub = makeUserGetterStub()
  const userSignerStub = makeUserSigner()
  const sut = new SignUpController(
    emailValidatorStub,
    userGetterStub,
    firstAccessTokenGeneratorStub,
    userAdderStub,
    firstAccessEmailSenderStub,
    userSignerStub
  )
  return {
    sut,
    emailValidatorStub,
    userGetterStub,
    firstAccessTokenGeneratorStub,
    userAdderStub,
    firstAccessEmailSenderStub,
    userSignerStub
  }
}

describe('SignUp Controller', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://127.0.0.1:27017/test')
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(
      emailValidatorStub,
      'isValid'
    ).mockReturnValueOnce(false)
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidEmailError())
  })

  test('Should return 400 if user already exists', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(makeFakeUser())
      })
    )
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new RegisteredParmError('email'))
  })

  test('Should call email validator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if emailvalidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(
      emailValidatorStub,
      'isValid'
    ).mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddUser with correct values', async () => {
    const { sut, userAdderStub } = makeSut()
    const addSpy = jest.spyOn(userAdderStub, 'add')
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      role: 'user',
      firstAccessToken: 'valid_token',
      userSettings: { autoScroll: true },
      createdAt: new Date(Date.now())
    })
  })

  test('Should return 500 if IAddUser throws', async () => {
    const { sut, userAdderStub } = makeSut()
    jest.spyOn(userAdderStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call user exists user getter with correct email', async () => {
    const { sut, userGetterStub } = makeSut()
    const getSpyOn = jest.spyOn(userGetterStub, 'getByEmail')
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    await sut.handle(httpRequest)
    expect(getSpyOn).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call first access token generator with correct token length', async () => {
    const { sut, firstAccessTokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(
      firstAccessTokenGeneratorStub,
      'generate'
    )
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    await sut.handle(httpRequest)
    expect(generateSpy).toHaveBeenCalledWith(4)
  })

  test('Should return 500 if user exists validator throws', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockImplementationOnce(
      async () => {
        return await new Promise((resolve, reject) => {
          reject(new Error())
        })
      }
    )
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if first access token generator throws', async () => {
    const { sut, firstAccessTokenGeneratorStub } = makeSut()
    jest.spyOn(
      firstAccessTokenGeneratorStub,
      'generate'
    ).mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if first access email sender throws', async () => {
    const { sut, firstAccessEmailSenderStub } = makeSut()
    jest.spyOn(
      firstAccessEmailSenderStub,
      'sendMail'
    ).mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call first access email sender with correct values', async () => {
    const { sut, firstAccessEmailSenderStub } = makeSut()
    const sendMailSpy = jest
      .spyOn(firstAccessEmailSenderStub, 'sendMail')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve) => {
          resolve('ok')
        })
      })
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        role: 'any_role'
      }
    }
    await sut.handle(httpRequest)
    expect(sendMailSpy).toHaveBeenCalledWith(
      'any_email@mail.com',
      'valid_token'
    )
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
        'access-token': 'any_token'
      },
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        role: 'valid_role'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      accessToken: 'valid_token'
    })
  })
})
