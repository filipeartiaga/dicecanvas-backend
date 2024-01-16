import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { AdminValidator } from '../../protocols/user'
import { FeatGetter, FeatDeleter } from '../../protocols/feat'

export class DeleteFeatController implements Controller {
  private readonly adminValidator: AdminValidator
  private readonly featGetter: FeatGetter
  private readonly featDeleter: FeatDeleter

  constructor (adminValidator: AdminValidator, featGetter: FeatGetter, featDeleter: FeatDeleter) {
    this.adminValidator = adminValidator
    this.featGetter = featGetter
    this.featDeleter = featDeleter
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

      const response = await this.featDeleter.delete(feat._id)

      return ok({
        response
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
