import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { CharacterSheetGetter } from '../../protocols/character-sheet'
import { AllMyCharacterSheetGetter } from 'src/presentation/protocols/character-sheet/all-my-character-sheet-getter'

export class GetCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly userDecoder: UserDecoder
  private readonly allMyCharacterSheetGetter: AllMyCharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, userDecoder: UserDecoder, characterSheetGetter: CharacterSheetGetter, allMyCharacterSheetGetter: AllMyCharacterSheetGetter) {
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

      const allMyCharacterSheet = await this.allMyCharacterSheetGetter.getAllMyCharacterSheet(myUser)

      return ok({
        allMyCharacterSheet
      })
    } catch (error) {
      return serverError()
    }
  }
}
