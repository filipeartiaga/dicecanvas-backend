import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator, UserGetter, UserSigner } from '../../protocols/user'

export class ForgotPasswordTokenAuthenticateController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly userSigner: UserSigner

  constructor (emailValidator: EmailValidator, userGetter: UserGetter, userSigner: UserSigner) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.userSigner = userSigner
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'passwordResetToken']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, passwordResetToken } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const user = await this.userGetter.getByEmail(email)
      if (!user) {
        return userNotFound(new InvalidParamError('email'))
      }

      if (user.passwordResetToken !== passwordResetToken) {
        return unauthorized(new InvalidParamError('passwordResetToken'))
      }

      const now = new Date(Date.now())
      if (now > user.passwordResetExpires) {
        return unauthorized(new Error('Token expired'))
      }

      const accessToken = this.userSigner.sign(user)

      return ok({ accessToken }
      )
    } catch (error) {
      return serverError()
    }
  }
}
