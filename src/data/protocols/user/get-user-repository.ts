import { UserModel } from '../../../domain/models/user/user'

export interface GetUserRepository {
  getById: (_id: string) => Promise<UserModel | null>
  getByEmail: (email: string) => Promise<UserModel | null>
}
