import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { AllMyCharacterSheetGetter } from '../../protocols/character-sheet'

export class GetAllMyCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly userDecoder: UserDecoder
  private readonly allMyCharacterSheetGetter: AllMyCharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, userDecoder: UserDecoder, allMyCharacterSheetGetter: AllMyCharacterSheetGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.userDecoder = userDecoder
    this.allMyCharacterSheetGetter = allMyCharacterSheetGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']
      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const myUser = this.userDecoder.decode(accessToken)

      const characterSheets = await this.allMyCharacterSheetGetter.getAllMyCharacterSheet(myUser)

      return ok({
        characterSheets
      })
    } catch (error) {
      return serverError()
    }
  }
}
