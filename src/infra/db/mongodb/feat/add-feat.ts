import { FeatModel } from '../../../../domain/models/feat/feat'
import { AddFeatModel } from '../../../../domain/usescases/feat/add-feat'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddFeatMongoRepository implements AddFeatMongoRepository {
  async add (FeatData: AddFeatModel): Promise<FeatModel> {
    const featCollection = await MongoHelper.getCollection('feats')
    const result = await featCollection.insertOne(FeatData)
    return result.ops[0]
  }
}
