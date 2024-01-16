import { FeatModel } from '../../../../domain/models/feat/feat'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetAllFeatMongoRepository implements GetAllFeatMongoRepository {
  async getAll (): Promise<FeatModel[]> {
    const featCollection = MongoHelper.getCollection('feats')
    const feats = await featCollection.find().toArray()
    return feats
  }
}
