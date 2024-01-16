import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { AllFeatGetter } from '../../protocols/feat'

export class GetAllFeatController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly allFeatGetter: AllFeatGetter

  constructor (authenticatedValidator: AuthenticatedValidator, allFeatGetter: AllFeatGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.allFeatGetter = allFeatGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const feats = await this.allFeatGetter.getAll()

      return ok({
        feats
      })
    } catch (error) {
      return serverError()
    }
  }
}
