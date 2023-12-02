import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AdminValidator } from '../../protocols/user'
import { AllCharacterSheetGetter } from '../../protocols/character-sheet'

export class GetAllCharacterSheetController implements Controller {
  private readonly adminValidator: AdminValidator
  private readonly allCharacterSheetGetter: AllCharacterSheetGetter

  constructor (adminValidator: AdminValidator, allCharacterSheetGetter: AllCharacterSheetGetter) {
    this.adminValidator = adminValidator
    this.allCharacterSheetGetter = allCharacterSheetGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin) {
        return unauthorized(new UnauthorizedError())
      }

      const characterSheets = await this.allCharacterSheetGetter.getAll()

      return ok({
        characterSheets
      })
    } catch (error) {
      return serverError()
    }
  }
}
