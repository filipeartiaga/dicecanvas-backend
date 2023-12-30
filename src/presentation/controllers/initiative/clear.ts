import { InitiativeClearer } from '../../protocols/initiative'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class ClearInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly initiativeClearer: InitiativeClearer

  constructor (authenticatedValidator: AuthenticatedValidator, initiativeClearer: InitiativeClearer) {
    this.authenticatedValidator = authenticatedValidator
    this.initiativeClearer = initiativeClearer
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'initiative', 'isSurprised', 'isActive']
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

      await this.initiativeClearer.clear()

      return ok({
        message: 'Initiative cleared'
      })
    } catch (error) {
      return serverError()
    }
  }
}
