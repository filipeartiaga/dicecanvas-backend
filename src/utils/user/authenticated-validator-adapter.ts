import { UserGetter } from '../../presentation/protocols/user'
import { AuthenticatedValidator } from '../../presentation/protocols/user/authenticated-validator'
import { UserDecoder } from '../../presentation/protocols/user/user-decoder'

export class AuthenticatedValidatorAdapter implements AuthenticatedValidator {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder

  constructor (userGetter: UserGetter, userDecoder: UserDecoder) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
  }

  async isAuthenticated (accessToken: string): Promise<boolean> {
    if (!accessToken) {
      return false
    }

    const userId = this.userDecoder.decode(accessToken)
    const user = await this.userGetter.getById(userId)
    if (user) {
      return true
    } else {
      return false
    }
  }
}
