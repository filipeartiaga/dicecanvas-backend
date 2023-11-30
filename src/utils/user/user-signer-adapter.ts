import { UserModel } from '../../domain/models/user/user'
import { UserSigner } from '../../presentation/protocols/user/user-signer'
import jwt from 'jsonwebtoken'

export class UserSignerAdapter implements UserSigner {
  secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  sign (user: UserModel): string {
    const payload = {
      user: {
        _id: user._id,
        email: user.email
      }
    }
    const accessToken = jwt.sign(payload, this.secret)
    return accessToken
  }
}
