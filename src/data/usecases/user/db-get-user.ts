import { UserModel } from '../../../domain/models/user/user'
import { GetUser } from '../../../domain/usescases/user/get-user'
import { GetUserRepository } from '../../protocols/user/get-user-repository'

export class DbGetUser implements GetUser {
  private readonly getUserRepository: GetUserRepository

  constructor (getUserRepository: GetUserRepository) {
    this.getUserRepository = getUserRepository
  }

  async getById (_id: string): Promise<UserModel | null> {
    const user = await this.getUserRepository.getById(_id)
    return user
  }

  async getByEmail (email: string): Promise<UserModel | null> {
    const user = await this.getUserRepository.getByEmail(email)
    return user
  }
}
