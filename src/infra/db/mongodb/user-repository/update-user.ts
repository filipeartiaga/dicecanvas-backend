import { UpdateUserRepository } from '../../../../data/protocols/user/update-user-repository'
import { UserModel } from '../../../../domain/models/user/user'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateUserMongoRepository implements UpdateUserRepository {
  async update (user: UserModel): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: user.password,
          name: user.name,
          isVerified: user.isVerified,
          passwordResetToken: user.passwordResetToken,
          passwordResetExpires: user.passwordResetExpires,
          userSettings: user.userSettings
        }
      },
      { returnDocument: 'after' }
    )
    return result.value
  }
}
