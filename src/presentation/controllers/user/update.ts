import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'
import { UserDecoder, UserGetter, UserUpdater } from '../../protocols/user'

export class UpdateUserController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter
  private readonly userUpdater: UserUpdater

  constructor (userDecoder: UserDecoder, userGetter: UserGetter, userUpdater: UserUpdater) {
    this.userDecoder = userDecoder
    this.userGetter = userGetter
    this.userUpdater = userUpdater
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers) {
        return badRequest(new MissingParamError('access-token'))
      }
      const accessToken = httpRequest.headers['access-token']

      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const {
        userSettings
      } = httpRequest.body

      const user = await this.userGetter.getById(this.userDecoder.decode(accessToken))

      if (!user) {
        return badRequest(new InvalidParamError('access-token'))
      }

      if (userSettings) user.userSettings = userSettings

      const updatedUser = await this.userUpdater.update(user)

      return ok({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        userSettings: updatedUser.userSettings,
        createdAt: updatedUser.createdAt
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
