import { FeatModel } from '../../../../domain/models/feat/feat'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetFeatMongoRepository implements GetFeatMongoRepository {
  async getById (_id: string): Promise<FeatModel> {
    const featCollection = MongoHelper.getCollection('feats')
    const userIdObjectId = new ObjectId(_id)
    const feat = await featCollection.findOne({ _id: userIdObjectId })
    return feat
  }
}
