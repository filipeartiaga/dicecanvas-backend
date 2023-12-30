import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { AllInitiativeGetter } from '../../protocols/initiative'
import { CharacterSheetGetter } from '../../protocols/character-sheet'

export class GetAllInitiativeController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly allInitiativeGetter: AllInitiativeGetter
  private readonly characterSheetGetter: CharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, allInitiativeGetter: AllInitiativeGetter, characterSheetGetter: CharacterSheetGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.allInitiativeGetter = allInitiativeGetter
    this.characterSheetGetter = characterSheetGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const initiatives = await this.allInitiativeGetter.getAll()

      return ok({
        initiatives
      })
    } catch (error) {
      return serverError()
    }
  }
}
