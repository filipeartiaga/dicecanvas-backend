import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserGetter } from '../../protocols/user'
import { UserDecoder } from '../../protocols/user/user-decoder'

export class GetMyUserController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter

  constructor (userDecoder: UserDecoder, userGetter: UserGetter) {
    this.userDecoder = userDecoder
    this.userGetter = userGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const user = await this.userGetter.getById(this.userDecoder.decode(accessToken))
      if (!user) {
        return unauthorized(new UnauthorizedError())
      }

      return ok({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        userSettings: user.userSettings,
        createdAt: user.createdAt
      })
    } catch (error) {
      return serverError()
    }
  }
}
