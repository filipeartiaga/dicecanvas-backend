import { FeatAdder } from '../../protocols/feat'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { AdminValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class CreateFeatController implements Controller {
  private readonly adminValidator: AdminValidator
  private readonly featAdder: FeatAdder

  constructor (adminValidator: AdminValidator, featAdder: FeatAdder) {
    this.adminValidator = adminValidator
    this.featAdder = featAdder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'abilityScoresIncreaseOptions', 'description', 'prerequisites']
      for (const field of requiredFields) {
        if (typeof httpRequest.body[field] === 'undefined') {
          return badRequest(new MissingParamError(field))
        }
      }

      const accessToken = httpRequest.headers['access-token']
      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin) {
        return unauthorized(new UnauthorizedError())
      }

      const {
        name,
        abilityScoresIncreaseOptions,
        description,
        prerequisites
      } = httpRequest.body

      const feat = await this.featAdder.add({
        name,
        abilityScoresIncreaseOptions,
        description,
        prerequisites
      })

      return ok({
        feat
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
