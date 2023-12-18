import { LogAdder, RollGenerator, RollValidator } from '../../protocols/log'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class CreatelogController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly logAdder: LogAdder
  private readonly userDecoder: UserDecoder
  private readonly rollValidator: RollValidator
  private readonly rollGenerator: RollGenerator

  constructor (authenticatedValidator: AuthenticatedValidator, logAdder: LogAdder, userDecoder: UserDecoder, rollValidator: RollValidator, rollGenerator: RollGenerator) {
    this.authenticatedValidator = authenticatedValidator
    this.logAdder = logAdder
    this.userDecoder = userDecoder
    this.rollValidator = rollValidator
    this.rollGenerator = rollGenerator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['type', 'characterSheetId']
      for (const field of requiredFields) {
        if (typeof httpRequest.body[field] === 'undefined') {
          return badRequest(new MissingParamError(field))
        }
      }

      const rollRequiredFields = ['rollRaw']
      const messageRequiredFields = ['message']

      const type = httpRequest.body.type

      if (type === 'roll') {
        for (const field of rollRequiredFields) {
          if (typeof httpRequest.body[field] === 'undefined') {
            return badRequest(new MissingParamError(field))
          }
        }
      } else if (type === 'message') {
        for (const field of messageRequiredFields) {
          if (typeof httpRequest.body[field] === 'undefined') {
            return badRequest(new MissingParamError(field))
          }
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
        rollNotation,
        characterSheetId
      } = httpRequest.body

      const isValidRoll = this.rollValidator.validate(rollNotation)

      const createdAt = new Date()

      let rollResult = null

      if (type === 'roll' && !isValidRoll) {
        return badRequest(new Error('Invalid roll'))
      }

      if (type === 'roll') {
        rollResult = this.rollGenerator.generate(rollNotation)
      }

      const log = await this.logAdder.add({
        userId: creator,
        characterSheetId,
        type,
        message,
        rollResult,
        rollNotation,
        createdAt
      })

      return ok({
        log
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
