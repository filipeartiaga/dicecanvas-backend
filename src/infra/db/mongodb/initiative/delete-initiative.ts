import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteInitiativeMongoRepository implements DeleteInitiativeMongoRepository {
  async delete (initiative: string): Promise<any> {
    const initiativesCollection = MongoHelper.getCollection('initiatives')
    const response = await initiativesCollection.deleteOne({ _id: initiative })
    return response
  }
}
