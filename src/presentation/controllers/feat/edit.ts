import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { AdminValidator } from '../../protocols/user'
import { FeatGetter, FeatUpdater } from '../../protocols/feat'

export class EditFeatController implements Controller {
  private readonly adminValidator: AdminValidator
  private readonly featGetter: FeatGetter
  private readonly featUpdater: FeatUpdater

  constructor (adminValidator: AdminValidator, featGetter: FeatGetter, featUpdater: FeatUpdater) {
    this.adminValidator = adminValidator
    this.featGetter = featGetter
    this.featUpdater = featUpdater
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
      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin) {
        return unauthorized(new UnauthorizedError())
      }

      const {
        _id
      } = httpRequest.body

      const feat = await this.featGetter.getById(_id)

      if (!feat) {
        return badRequest(new InvalidParamError('_id'))
      }

      const {
        name,
        abilityScoresIncreaseOptions,
        description,
        prerequisites
      } = httpRequest.body

      feat.name = name
      feat.abilityScoresIncreaseOptions = abilityScoresIncreaseOptions
      feat.description = description
      feat.prerequisites = prerequisites

      const updatedFeat = await this.featUpdater.update(feat)

      return ok({
        updatedFeat
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
