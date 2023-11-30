import { UserModel } from '../../../../domain/models/user/user'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class GetUserMongoRepository implements GetUserMongoRepository {
  async getById (_id: string): Promise<UserModel> {
    const userCollection = MongoHelper.getCollection('users')
    const userIdObjectId = new ObjectId(_id)
    const user = await userCollection.findOne({ _id: userIdObjectId })
    return user
  }

  async getByEmail (email: string): Promise<UserModel> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user
  }
}
