import { InitiativeModel } from '../../../../domain/models/initiative/initiative'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateInitiativeMongoRepository implements UpdateInitiativeMongoRepository {
  async update (initiativeData: InitiativeModel): Promise<InitiativeModel> {
    const statusCollection = await MongoHelper.getCollection('initiatives')
    const result = await statusCollection.findOneAndUpdate(
      { _id: initiativeData._id },
      {
        $set: {
          name: initiativeData.name,
          initiative: initiativeData.initiative,
          isSurprised: initiativeData.isSurprised,
          isActive: initiativeData.isActive,
          isMyTurn: initiativeData.isMyTurn
        }
      },
      { returnDocument: 'after' }
    )
    return result.value
  }
}
