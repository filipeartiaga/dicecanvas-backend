import { UserSettings } from 'src/domain/models/user/user'
import { MissingParamError, RegisteredParmError } from '../../errors/'
import { InvalidEmailError } from '../../errors/invalid-email-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserAdder, UserGetter, FirstAccessEmailSender, FirstAccessTokenGenerator, EmailValidator, Controller, UserSigner } from '../../protocols/user/'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly firstAccessTokenGenerator: FirstAccessTokenGenerator
  private readonly userAdder: UserAdder
  private readonly firstAccessEmailSender: FirstAccessEmailSender
  private readonly userSigner: UserSigner

  constructor (emailValidator: EmailValidator, userGetter: UserGetter, firstAccessTokenGenerator: FirstAccessTokenGenerator, userAdder: UserAdder, firstAccessEmailSender: FirstAccessEmailSender, userSigner: UserSigner) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.firstAccessTokenGenerator = firstAccessTokenGenerator
    this.userAdder = userAdder
    this.firstAccessEmailSender = firstAccessEmailSender
    this.userSigner = userSigner
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidEmailError())
      }

      const existingUser = await this.userGetter.getByEmail(email)
      if (existingUser) {
        return badRequest(new RegisteredParmError('email'))
      }

      const firstAccessToken = this.firstAccessTokenGenerator.generate(4)
      const createdAt = new Date(Date.now())

      const userSettings: UserSettings = {
        autoScroll: true
      }

      const user = await this.userAdder.add({
        name,
        email,
        firstAccessToken,
        role: 'user',
        userSettings,
        createdAt
      })

      await this.firstAccessEmailSender.sendMail(email, firstAccessToken)

      const accessToken = this.userSigner.sign(user)

      return ok({ accessToken })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
