import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteFeatMongoRepository implements DeleteFeatMongoRepository {
  async delete (_id: string): Promise<any> {
    const featCollection = MongoHelper.getCollection('feats')
    const response = await featCollection.deleteOne({ _id })
    return response
  }
}
