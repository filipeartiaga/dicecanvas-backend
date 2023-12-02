import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AdminValidator, AuthenticatedValidator } from '../../protocols/user'
import { CharacterSheetGetter } from '../../protocols/character-sheet'

export class GetCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly adminValidator: AdminValidator
  private readonly userDecoder: UserDecoder
  private readonly characterSheetGetter: CharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, adminValidator: AdminValidator, userDecoder: UserDecoder, characterSheetGetter: CharacterSheetGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.adminValidator = adminValidator
    this.userDecoder = userDecoder
    this.characterSheetGetter = characterSheetGetter
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

      const characterSheet = await this.characterSheetGetter.getById(_id)

      if (!characterSheet) {
        return badRequest(new InvalidParamError('characterSheet'))
      }
      const creator = this.userDecoder.decode(accessToken)

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin && characterSheet.creator !== creator) {
        return unauthorized(new UnauthorizedError())
      }

      return ok({
        characterSheet
      })
    } catch (error) {
      return serverError()
    }
  }
}
