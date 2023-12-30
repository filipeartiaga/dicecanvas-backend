import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AdminValidator, AuthenticatedValidator } from '../../protocols/user'
import { InitiativeDeleter, InitiativeGetter } from '../../protocols/initiative'

export class DeleteInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly adminValidator: AdminValidator
  private readonly userDecoder: UserDecoder
  private readonly initiativeGetter: InitiativeGetter
  private readonly initiativeDeleter: InitiativeDeleter

  constructor (authenticatedValidator: AuthenticatedValidator, adminValidator: AdminValidator, userDecoder: UserDecoder, initiativeGetter: InitiativeGetter, initiativeDeleter: InitiativeDeleter) {
    this.authenticatedValidator = authenticatedValidator
    this.adminValidator = adminValidator
    this.userDecoder = userDecoder
    this.initiativeGetter = initiativeGetter
    this.initiativeDeleter = initiativeDeleter
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

      const initiative = await this.initiativeGetter.getById(_id)

      if (initiative) {
        return unauthorized(new UnauthorizedError())
      }

      const response = await this.initiativeDeleter.delete(_id)

      return ok({
        response
      })
    } catch (error) {
      return serverError()
    }
  }
}
