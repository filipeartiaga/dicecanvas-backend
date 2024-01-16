import { LogClearer } from '../../protocols/log'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class ClearLogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly logClearer: LogClearer

  constructor (authenticatedValidator: AuthenticatedValidator, logClearer: LogClearer) {
    this.authenticatedValidator = authenticatedValidator
    this.logClearer = logClearer
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = []
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

      await this.logClearer.clear()

      return ok({
        message: 'Logs cleared'
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
