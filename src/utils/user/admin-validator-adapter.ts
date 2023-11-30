import { UserGetter } from '../../presentation/protocols/user'
import { AdminValidator } from '../../presentation/protocols/user/admin-validator'
import { UserDecoder } from '../../presentation/protocols/user/user-decoder'

export class AdminValidatorAdapter implements AdminValidator {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder

  constructor (userGetter: UserGetter, userDecoder: UserDecoder) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
  }

  async isAdmin (accessToken: string): Promise<boolean> {
    if (!accessToken) {
      return false
    }

    const userId = this.userDecoder.decode(accessToken)
    const user = await this.userGetter.getById(userId)
    if (!user || user.role !== 'admin') {
      return false
    }
    return true
  }
}
