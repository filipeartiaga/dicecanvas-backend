import { LogAdder, RollGenerator } from '../../protocols/log'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'
import { CharacterSheetGetter } from '../../protocols/character-sheet'

export class CreateLogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly logAdder: LogAdder
  private readonly userDecoder: UserDecoder
  private readonly rollGenerator: RollGenerator
  private readonly characterSheetGetter: CharacterSheetGetter

  constructor (authenticatedValidator: AuthenticatedValidator, logAdder: LogAdder, userDecoder: UserDecoder, rollGenerator: RollGenerator, characterSheetGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.logAdder = logAdder
    this.userDecoder = userDecoder
    this.rollGenerator = rollGenerator
    this.characterSheetGetter = characterSheetGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['characterSheetId', 'message']
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

      const creator = this.userDecoder.decode(accessToken)

      const {
        message,
        characterSheetId,
        checkType
      } = httpRequest.body

      let type = ''
      let rollResult = null
      rollResult = this.rollGenerator.generate(message)

      if (rollResult.result) {
        type = 'roll'
      } else {
        type = 'message'
      }

      const createdAt = new Date()

      const log = await this.logAdder.add({
        userId: creator,
        characterSheetId,
        type,
        message,
        rollResult,
        checkType,
        createdAt
      })

      const characterSheet = await this.characterSheetGetter.getById(characterSheetId)

      return ok({
        userId: log.userId,
        characterSheetId: log.characterSheetId,
        characterSheetName: characterSheet.name,
        type: log.type,
        message: log.message,
        rollResult: log.rollResult,
        createdAt: log.createdAt
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
