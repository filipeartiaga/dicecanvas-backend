import { UserNotVerifiedError } from '../../../presentation/errors/user-not-verified-error'
import { UserModel } from '../../../domain/models/user/user'
import { InvalidParamError, MissingParamError, ServerError, UnauthorizedError } from '../../errors'
import { EmailValidator, Encrypter, UserGetter, UserSigner } from '../../protocols/user'
import { LoginController } from './login'
import { UserNotFoundError } from '../../../presentation/errors/user-not-found-error'

interface ISutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  userGetterStub: UserGetter
  encrypterStub: Encrypter
  signerStub: UserSigner
}

const EmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValidExitlagMail (email: string): boolean {
      return true
    }

    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
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

const makeUnverifiedFakeUser = (): UserModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  role: 'valid_role',
  password: 'valid_password',
  isVerified: false,
  passwordResetToken: 'valid_token',
  passwordResetExpires: new Date(),
  firstAccessToken: 'valid_token',
  userSettings: {
    autoScroll: true
  },
  createdAt: new Date()
})

const UserGetterStub = (): UserGetter => {
  class UserGetterStub implements UserGetter {
    async getById (_id: string): Promise<UserModel | null> {
      return makeFakeUser()
    }

    async getByEmail (email: string): Promise<UserModel | null> {
      return makeFakeUser()
    }
  }
  return new UserGetterStub()
}

const EncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async compare (password: string, hash: string): Promise<boolean> {
      return true
    }

    async hash (password: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

const IUserSignerStub = (): UserSigner => {
  class IUserSignerStub implements UserSigner {
    secret: string
    sign (user: UserModel): string {
      return 'any_token'
    }
  }
  return new IUserSignerStub()
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = EmailValidatorStub()
  const userGetterStub = UserGetterStub()
  const encrypterStub = EncrypterStub()
  const signerStub = IUserSignerStub()
  const sut = new LoginController(
    emailValidatorStub,
    userGetterStub,
    encrypterStub,
    signerStub
  )
  return {
    sut,
    emailValidatorStub,
    userGetterStub,
    encrypterStub,
    signerStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 401 if UserGetter returns null', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(null)
      })
    )
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UserNotFoundError())
  })

  test('Should return 403 if encrypter compare returns false', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'compare').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(false)
      })
    )
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 403 if user is not verified', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(makeUnverifiedFakeUser())
      })
    )
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body).toEqual(new UserNotVerifiedError())
  })

  test('Should return 500 IUserGetter throws', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if Signer throws', async () => {
    const { sut, signerStub } = makeSut()
    jest.spyOn(signerStub, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual('any_token')
  })
})
