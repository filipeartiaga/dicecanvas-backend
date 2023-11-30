import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound, userNotVerified } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator, UserGetter, UserSigner } from '../../protocols/user'
import { Encrypter } from '../../protocols/user/encrypter'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly encrypter: Encrypter
  private readonly userSigner: UserSigner

  constructor (emailValidator: EmailValidator, userGetter: UserGetter, encrypter: Encrypter, userSigner: UserSigner) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.encrypter = encrypter
    this.userSigner = userSigner
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValidExitlagMail(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const user = await this.userGetter.getByEmail(email)
      if (!user) {
        return userNotFound(new InvalidParamError('email'))
      }

      if (!user.isVerified) {
        return userNotVerified()
      }

      const isValidPassword = await this.encrypter.compare(password, user.password)
      if (!isValidPassword) {
        return unauthorized(new InvalidParamError('password'))
      }

      const accessToken = this.userSigner.sign(user)

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError()
    }
  }
}
