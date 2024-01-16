import { FeatModel } from '../../../../domain/models/feat/feat'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateFeatMongoRepository implements UpdateFeatMongoRepository {
  async update (feat: FeatModel): Promise<FeatModel> {
    const statusCollection = await MongoHelper.getCollection('feats')
    const result = await statusCollection.findOneAndUpdate(
      { _id: feat._id },
      {
        $set: {
          name: feat.name,
          abilityScoresIncreaseOptions: feat.abilityScoresIncreaseOptions,
          description: feat.description,
          prerequisites: feat.prerequisites
        }
      },
      { returnDocument: 'after' }
    )
    return result.value
  }
}
