import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AdminValidator, AuthenticatedValidator } from '../../protocols/user'
import { CharacterSheetGetter, CharacterSheetDeleter } from '../../protocols/character-sheet'

export class DeleteCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly adminValidator: AdminValidator
  private readonly userDecoder: UserDecoder
  private readonly characterSheetGetter: CharacterSheetGetter
  private readonly characterSheetDeleter: CharacterSheetDeleter

  constructor (authenticatedValidator: AuthenticatedValidator, adminValidator: AdminValidator, userDecoder: UserDecoder, characterSheetGetter: CharacterSheetGetter, characterSheetDeleter: CharacterSheetDeleter) {
    this.authenticatedValidator = authenticatedValidator
    this.adminValidator = adminValidator
    this.userDecoder = userDecoder
    this.characterSheetGetter = characterSheetGetter
    this.characterSheetDeleter = characterSheetDeleter
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
      } = httpRequest.body

      const characterSheet = await this.characterSheetGetter.getById(_id)

      if (!characterSheet) {
        return badRequest(new InvalidParamError('characterSheet'))
      }

      const creator = this.userDecoder.decode(accessToken)

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin && characterSheet.creator !== creator) {
        return unauthorized(new UnauthorizedError())
      }

      const response = await this.characterSheetDeleter.delete(characterSheet._id)

      return ok({
        response
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
