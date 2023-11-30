import { UserModel } from '../../../domain/models/user/user'
import { AddUserModel } from '../../../domain/usescases/user/add-user'

export interface UserAdder {
  add (user: AddUserModel): Promise<UserModel>
}
