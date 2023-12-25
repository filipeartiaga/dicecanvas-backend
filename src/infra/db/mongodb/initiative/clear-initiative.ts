import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteInitiativeMongoRepository implements DeleteInitiativeMongoRepository {
  async clear (): Promise<any> {
    const initiativesCollection = MongoHelper.getCollection('initiatives')
    const response = await initiativesCollection.delete()
    return response
  }
}
