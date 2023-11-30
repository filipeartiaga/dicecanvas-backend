import { UserDecoder } from '../../presentation/protocols/user/user-decoder'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class UserDecoderAdapter implements UserDecoder {
  readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  decode (accessToken: string): string {
    const decoded: JwtPayload = jwt.verify(accessToken, this.secret) as JwtPayload
    return decoded.user._id
  }
}
