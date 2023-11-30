import { UserModel } from '../../models/user/user'

export interface AddUserModel {
  name: string
  email: string
  firstAccessToken: string
  role: string
  createdAt: Date
}

export interface AddUser {
  add (user: AddUserModel): Promise<UserModel>
}
