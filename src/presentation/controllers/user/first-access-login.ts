import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors/'
import { badRequest, ok, serverError, unauthorized, userNotFound } from '../../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller, UserGetter, UserSigner, UserUpdater } from '../../protocols/user'

export class FirstAccessLoginController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userUpdater: UserUpdater
  private readonly userSigner: UserSigner

  constructor (userGetter: UserGetter, userUpdater: UserUpdater, userSigner: UserSigner) {
    this.userGetter = userGetter
    this.userUpdater = userUpdater
    this.userSigner = userSigner
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'firstAccessToken']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, firstAccessToken } = httpRequest.body
      const user = await this.userGetter.getByEmail(email)
      if (!user) {
        return userNotFound(new InvalidParamError('email'))
      }

      if (user.firstAccessToken !== firstAccessToken || (user.isVerified && user.password)) {
        return unauthorized(new UnauthorizedError())
      }

      user.isVerified = true
      await this.userUpdater.update(user)

      const accessToken = this.userSigner.sign(user)

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError()
    }
  }
}
