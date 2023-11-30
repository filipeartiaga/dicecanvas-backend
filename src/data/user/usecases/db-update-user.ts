import { UserModel } from '../../../domain/models/user/user'
import { UpdateUser } from '../../../domain/usescases/user/update-user'
import { UpdateUserRepository } from '../../protocols/user/update-user-repository'

export class DbUpdateUser implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  constructor (updateUserRepository: UpdateUserRepository) {
    this.updateUserRepository = updateUserRepository
  }

  async update (user: UserModel): Promise<UserModel> {
    const userUpdated = await this.updateUserRepository.update(user)
    return userUpdated
  }
}
