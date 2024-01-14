import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { InvalidParamError } from '../../errors'
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
      const accessToken = httpRequest.headers['access-token']

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
        updatedUser
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
