import { InitiativeGetter, InitiativeUpdater } from '../../protocols/initiative'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class UpdateInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly initiativeGetter: InitiativeGetter
  private readonly initiativeUpdater: InitiativeUpdater

  constructor (authenticatedValidator: AuthenticatedValidator, initiativeGetter: InitiativeGetter, initiativeUpdater: InitiativeUpdater) {
    this.authenticatedValidator = authenticatedValidator
    this.initiativeGetter = initiativeGetter
    this.initiativeUpdater = initiativeUpdater
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
        _id,
        name,
        initiative,
        isSurprised,
        isActive,
        isMyTurn
      } = httpRequest.body

      const initiativeToEdit = await this.initiativeGetter.getById(_id)

      if (!initiativeToEdit) {
        return badRequest(new MissingParamError('_id'))
      }

      initiativeToEdit.name = name
      initiativeToEdit.initiative = initiative
      initiativeToEdit.isSurprised = isSurprised
      initiativeToEdit.isActive = isActive
      initiativeToEdit.isMyTurn = isMyTurn

      const updatedInitiative = await this.initiativeUpdater.update(initiativeToEdit)

      return ok({
        updatedInitiative
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
