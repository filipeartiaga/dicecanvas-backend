import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AdminValidator, UserDecoder } from '../../protocols/user'
import { AllCharacterSheetGetter } from '../../protocols/character-sheet'

export class GetAllCharacterSheetController implements Controller {
  private readonly adminValidator: AdminValidator
  private readonly allCharacterSheetGetter: AllCharacterSheetGetter
  private readonly userDecoder: UserDecoder

  constructor (adminValidator: AdminValidator, allCharacterSheetGetter: AllCharacterSheetGetter, userDecoder: UserDecoder) {
    this.adminValidator = adminValidator
    this.allCharacterSheetGetter = allCharacterSheetGetter
    this.userDecoder = userDecoder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin) {
        return unauthorized(new UnauthorizedError())
      }

      const myId = this.userDecoder.decode(accessToken)
      const characterSheets = (await this.allCharacterSheetGetter.getAll()).sort((a, b) => {
        if (a.creator === myId) {
          return -1
        }

        if (b.creator === myId) {
          return 1
        }

        return 0
      })

      return ok({
        characterSheets
      })
    } catch (error) {
      return serverError()
    }
  }
}
