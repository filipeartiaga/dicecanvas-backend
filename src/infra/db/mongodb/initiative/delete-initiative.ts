import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteInitiativeMongoRepository implements DeleteInitiativeMongoRepository {
  async delete (_id: string): Promise<any> {
    const initiativesCollection = MongoHelper.getCollection('initiatives')
    const response = await initiativesCollection.delete({ _id })
    return response
  }
}
