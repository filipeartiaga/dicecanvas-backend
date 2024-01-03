import { MongoHelper } from '../helpers/mongo-helper'

export class ClearInitiativeMongoRepository implements ClearInitiativeMongoRepository {
  async clear (): Promise<any> {
    const initiativesCollection = MongoHelper.getCollection('initiatives')
    // clear all initiatives
    const response = await initiativesCollection.deleteMany({})
    return response
  }
}
