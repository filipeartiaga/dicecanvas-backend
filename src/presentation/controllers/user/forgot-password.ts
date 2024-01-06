import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator, UserGetter, UserUpdater } from '../../protocols/user'
import { ForgotPasswordEmailSender } from '../../protocols/user/forgot-password-email-sender'
import { ForgotPasswordTokenGenerator } from '../../protocols/user/forgot-password-token-generator'

export class ForgotPasswordController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly forgotPasswordTokenGenerator: ForgotPasswordTokenGenerator
  private readonly userUpdater: UserUpdater
  private readonly forgotPasswordEmailSender: ForgotPasswordEmailSender

  constructor (emailValidator: EmailValidator, userGetter: UserGetter, forgotPasswordTokenGenerator: ForgotPasswordTokenGenerator, userUpdater: UserUpdater, forgotPasswordEmailSender: ForgotPasswordEmailSender) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.forgotPasswordTokenGenerator = forgotPasswordTokenGenerator
    this.userUpdater = userUpdater
    this.forgotPasswordEmailSender = forgotPasswordEmailSender
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const user = await this.userGetter.getByEmail(email)
      if (!user) {
        return userNotFound(new InvalidParamError('email'))
      }

      const passwordResetToken = this.forgotPasswordTokenGenerator.generate(4)
      const passwordResetTokenExpires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

      user.passwordResetToken = passwordResetToken
      user.passwordResetExpires = passwordResetTokenExpires
      user.isVerified = true

      await this.userUpdater.update(user)

      await this.forgotPasswordEmailSender.sendMail(email, passwordResetToken)

      return ok({
        message: 'Email sent successfully'
      })
    } catch (error) {
      return serverError()
    }
  }
}
