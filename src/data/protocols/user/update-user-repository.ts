import { UserModel } from '../../../domain/models/user/user'

export interface UpdateUserRepository {
  update: (user: UserModel) => Promise<UserModel>
}
