import { UserModel } from '../../models/user/user'

export interface UpdateUser {
  update (user: UserModel): Promise<UserModel>
}
