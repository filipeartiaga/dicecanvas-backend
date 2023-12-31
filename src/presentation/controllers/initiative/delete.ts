import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { InitiativeDeleter, InitiativeGetter } from '../../protocols/initiative'
import { AuthenticatedValidator } from '../../protocols/user'

export class DeleteInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly initiativeGetter: InitiativeGetter
  private readonly initiativeDeleter: InitiativeDeleter

  constructor (authenticatedValidator: AuthenticatedValidator, initiativeGetter: InitiativeGetter, initiativeDeleter: InitiativeDeleter) {
    this.authenticatedValidator = authenticatedValidator
    this.initiativeGetter = initiativeGetter
    this.initiativeDeleter = initiativeDeleter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['_id']
      for (const field of requiredFields) {
        if (typeof httpRequest.headers[field] === 'undefined') {
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
      } = httpRequest.headers

      const initiative = await this.initiativeGetter.getById(_id)

      if (!initiative) {
        return unauthorized(new UnauthorizedError())
      }

      const response = await this.initiativeDeleter.delete(_id)

      return ok({
        response
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
