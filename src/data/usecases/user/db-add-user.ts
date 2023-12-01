import { UserModel } from '../../../domain/models/user/user'
import { AddUser, AddUserModel } from '../../../domain/usescases/user/add-user'
import { AddUserRepository } from '../../protocols/user/add-user-repository'

export class DbAddUser implements AddUser {
  private readonly addUserRepository: AddUserRepository

  constructor (addUserRepository: AddUserRepository) {
    this.addUserRepository = addUserRepository
  }

  async add (userData: AddUserModel): Promise<UserModel> {
    const user = await this.addUserRepository.add(userData)
    return user
  }
}
