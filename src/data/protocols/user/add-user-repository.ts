import { UserModel } from '../../../domain/models/user/user'
import { AddUserModel } from '../../../domain/usescases/user/add-user'

export interface AddUserRepository {
  add: (accountData: AddUserModel) => Promise<UserModel>
}
