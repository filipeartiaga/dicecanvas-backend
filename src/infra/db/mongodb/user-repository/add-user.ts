import { AddUserRepository } from '../../../../data/protocols/user/add-user-repository'
import { UserModel } from '../../../../domain/models/user/user'
import { AddUserModel } from '../../../../domain/usescases/user/add-user'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddUserMongoRepository implements AddUserRepository {
  async add (userData: AddUserModel): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)
    return result.ops[0]
  }
}
