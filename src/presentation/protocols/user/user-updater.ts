import { UserModel } from '../../../domain/models/user/user'

export interface UserUpdater {
  update (user: UserModel): Promise<UserModel>
}
