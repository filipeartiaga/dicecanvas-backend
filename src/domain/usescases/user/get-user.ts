import { UserModel } from '../../models/user/user'

export interface GetUser {
  getById (_id: string): Promise<UserModel | null>
  getByEmail (email: string): Promise<UserModel | null>
}
