import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { UnauthorizedError } from '../../errors'
import { AuthenticatedValidator } from '../../protocols/user'
import { AllLogGetter } from '../../protocols/log'
import { CharacterSheetGetter } from '../../protocols/character-sheet'

export class GetAllLogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly allLogGetter: AllLogGetter
  private readonly characterSheetGetter: CharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, allLogGetter: AllLogGetter, characterSheetGetter: CharacterSheetGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.allLogGetter = allLogGetter
    this.characterSheetGetter = characterSheetGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers['access-token']

      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const logs = await this.allLogGetter.getAll()

      const logsWithCharacterSheetName = await Promise.all(logs.map(async log => {
        const characterSheet = await this.characterSheetGetter.getById(log.characterSheetId)

        return {
          ...log,
          characterSheetName: characterSheet.name
        }
      }))

      return ok({
        logsWithCharacterSheetName
      })
    } catch (error) {
      return serverError()
    }
  }
}
