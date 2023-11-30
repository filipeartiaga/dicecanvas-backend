import { UserModel } from '../../../domain/models/user/user'

export interface UserSigner {
  secret: string
  sign (user: UserModel): string
}
