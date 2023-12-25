import { InitiativeModel } from '../../../../domain/models/initiative/initiative'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetInitiativeMongoRepository implements GetInitiativeMongoRepository {
  async getById (_id: string): Promise<InitiativeModel> {
    const initiativeCollection = MongoHelper.getCollection('initiatives')
    const userIdObjectId = new ObjectId(_id)
    const initiative = await initiativeCollection.findOne({ _id: userIdObjectId })
    return initiative
  }
}
