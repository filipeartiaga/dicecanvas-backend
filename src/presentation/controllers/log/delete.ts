import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AdminValidator, AuthenticatedValidator } from '../../protocols/user'
import { LogDeleter, LogGetter } from '../../protocols/log'

export class DeleteLogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly adminValidator: AdminValidator
  private readonly userDecoder: UserDecoder
  private readonly logGetter: LogGetter
  private readonly logDeleter: LogDeleter

  constructor (authenticatedValidator: AuthenticatedValidator, adminValidator: AdminValidator, userDecoder: UserDecoder, logGetter: LogGetter, logDeleter: LogDeleter) {
    this.authenticatedValidator = authenticatedValidator
    this.adminValidator = adminValidator
    this.userDecoder = userDecoder
    this.logGetter = logGetter
    this.logDeleter = logDeleter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['_id']
      for (const field of requiredFields) {
        if (typeof httpRequest.body[field] === 'undefined') {
          return badRequest(new MissingParamError(field))
        }
      }

      const accessToken = httpRequest.headers['access-token']
      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const {
        _id
      } = httpRequest.body._id

      const userId = this.userDecoder.decode(accessToken)

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      const log = await this.logGetter.getById(_id)

      if (!isAdmin && log.userId !== userId) {
        return unauthorized(new UnauthorizedError())
      }

      const response = await this.logDeleter.delete(_id)

      return ok({
        response
      })
    } catch (error) {
      return serverError()
    }
  }
}
