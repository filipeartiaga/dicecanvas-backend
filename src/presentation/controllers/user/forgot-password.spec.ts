import { InvalidParamError, MissingParamError, UserNotFoundError } from '../../errors'
import { badRequest, userNotFound } from '../../helpers/http-helpers'
import { HttpRequest } from '../../protocols/http'
import { EmailValidator } from '../../protocols/user/email-validator'
import { UserGetter, UserModel, UserUpdater } from '../../protocols/user'
import { ForgotPasswordEmailSender } from '../../protocols/user/forgot-password-email-sender'
import { ForgotPasswordTokenGenerator } from '../../protocols/user/forgot-password-token-generator'
import { ForgotPasswordController } from './forgot-password'

const mockedDate = new Date(2000, 9, 1, 7)
jest.spyOn(global, 'Date').mockImplementation(() => {
  return mockedDate
})

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
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

const makeUserGetterStub = (): UserGetter => {
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

const makeUserUpdaterStub = (): UserUpdater => {
  class UserUpdaterStub implements UserUpdater {
    async update (user: UserModel): Promise<UserModel> {
      return makeFakeUser()
    }
  }
  return new UserUpdaterStub()
}

const makeForgotPasswordTokenGeneratorStub = (): ForgotPasswordTokenGenerator => {
  class ForgotPasswordTokenGeneratorStub
  implements ForgotPasswordTokenGenerator {
    generate (length: number): string {
      return 'valid_token'
    }
  }
  return new ForgotPasswordTokenGeneratorStub()
}

const makeForgotPasswordEmailSenderStub = (): ForgotPasswordEmailSender => {
  class ForgotPasswordEmailSenderStub implements ForgotPasswordEmailSender {
    async sendMail (email: string, firstAccessToken: string): Promise<any> {
      return await new Promise((resolve) => {
        resolve('ok')
      })
    }
  }
  return new ForgotPasswordEmailSenderStub()
}

interface ISutTypes {
  sut: ForgotPasswordController
  emailValidatorStub: EmailValidator
  userGetterStub: UserGetter
  forgotPasswordTokenGeneratorStub: ForgotPasswordTokenGenerator
  userUpdaterStub: UserUpdater
  forgotPasswordEmailSenderStub: ForgotPasswordEmailSender
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'valid_email@mail.com'
  }
})

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const userGetterStub = makeUserGetterStub()
  const userUpdaterStub = makeUserUpdaterStub()
  const forgotPasswordTokenGeneratorStub = makeForgotPasswordTokenGeneratorStub()
  const forgotPasswordEmailSenderStub = makeForgotPasswordEmailSenderStub()
  const sut = new ForgotPasswordController(
    emailValidatorStub,
    userGetterStub,
    forgotPasswordTokenGeneratorStub,
    userUpdaterStub,
    forgotPasswordEmailSenderStub
  )
  return {
    sut,
    emailValidatorStub,
    userGetterStub,
    forgotPasswordTokenGeneratorStub,
    userUpdaterStub,
    forgotPasswordEmailSenderStub
  }
}

describe('Forgot Password IController', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('email'))
    )
  })

  test('Should return 400 if email is invalid email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(
      emailValidatorStub,
      'isValid'
    ).mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('email'))
    )
  })

  test('Should return 401 if user is not found', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockReturnValueOnce(
      new Promise((resolve) => { resolve(null) })
    )
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse).toEqual(
      userNotFound(new UserNotFoundError())
    )
  })

  test('Should call UserGetter with correct email', async () => {
    const { sut, userGetterStub } = makeSut()
    const getByEmailSpy = jest.spyOn(userGetterStub, 'getByEmail')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(getByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return 500 if UserGetter throws', async () => {
    const { sut, userGetterStub } = makeSut()
    jest.spyOn(userGetterStub, 'getByEmail').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) })
    )
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call ForgotPasswordTokenGenerator with correct length', async () => {
    const { sut, forgotPasswordTokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(
      forgotPasswordTokenGeneratorStub,
      'generate'
    )
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(generateSpy).toHaveBeenCalledWith(4)
  })

  test('Should return 500 if ForgotPasswordTokenGenerator throws', async () => {
    const { sut, forgotPasswordTokenGeneratorStub } = makeSut()
    jest.spyOn(
      forgotPasswordTokenGeneratorStub,
      'generate'
    ).mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call UserUpdater with correct values', async () => {
    const { sut, userUpdaterStub } = makeSut()
    const updateSpy = jest.spyOn(userUpdaterStub, 'update')
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(updateSpy).toHaveBeenCalledWith(makeFakeUser())
  })

  test('Should return 500 if UserUpdater throws', async () => {
    const { sut, userUpdaterStub } = makeSut()
    jest.spyOn(userUpdaterStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call ForgotPasswordEmailSender with correct values', async () => {
    const { sut, forgotPasswordEmailSenderStub } = makeSut()
    const sendMailSpy = jest.spyOn(
      forgotPasswordEmailSenderStub,
      'sendMail'
    )
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(sendMailSpy).toHaveBeenCalledWith(
      'valid_email@mail.com',
      'valid_token'
    )
  })

  test('Should return 500 if ForgotPasswordEmailSender throws', async () => {
    const { sut, forgotPasswordEmailSenderStub } = makeSut()
    jest.spyOn(
      forgotPasswordEmailSenderStub,
      'sendMail'
    ).mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      message: 'Email sent successfully'
    })
  })
})
