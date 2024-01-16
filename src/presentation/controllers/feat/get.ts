import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { FeatGetter } from '../../protocols/feat'

export class GetFeatController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly userDecoder: UserDecoder
  private readonly featGetter: FeatGetter

  constructor (authenticatedValidator: AuthenticatedValidator, featGetter: FeatGetter) {
    this.authenticatedValidator = authenticatedValidator
    this.featGetter = featGetter
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

      const feat = await this.featGetter.getById(_id)

      if (!feat) {
        return badRequest(new InvalidParamError('feat'))
      }
      return ok({
        Feat: feat
      })
    } catch (error) {
      return serverError()
    }
  }
}
