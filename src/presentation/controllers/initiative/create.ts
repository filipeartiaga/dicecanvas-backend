import { InitiativeAdder } from '../../protocols/initiative'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class CreateInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly initiativeAdder: InitiativeAdder

  constructor (authenticatedValidator: AuthenticatedValidator, initiativeAdder: InitiativeAdder) {
    this.authenticatedValidator = authenticatedValidator
    this.initiativeAdder = initiativeAdder
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

      const {
        name,
        initiative,
        isSurprised,
        isActive
      } = httpRequest.body

      const init = await this.initiativeAdder.add({
        name,
        initiative,
        isSurprised,
        isActive
      })

      return ok({
        _id: init._id,
        name: init.name,
        initiative: init.initiative,
        isSurprised: init.isSurprised,
        isActive: init.isActive
      })
    } catch (error) {
      return serverError()
    }
  }
}
