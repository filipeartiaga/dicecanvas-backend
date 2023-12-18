import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { AllLogGetter } from '../../protocols/log'

export class GetAllLogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly allLogGetter: AllLogGetter

  constructor (authenticatedValidator: AuthenticatedValidator, allLogGetter: AllLogGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.allLogGetter = allLogGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const logs = await this.allLogGetter.getAll()

      return ok({
        logs
      })
    } catch (error) {
      return serverError()
    }
  }
}
