import { UserModel } from '../../models/user/user'

export interface SignUser {
  sign (account: UserModel, secret: string): string
}
