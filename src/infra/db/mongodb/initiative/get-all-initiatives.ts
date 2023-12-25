import { InitiativeModel } from '../../../../domain/models/initiative/initiative'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetAllInitiativesMongoRepository implements GetAllInitiativesMongoRepository {
  async getAll (): Promise<InitiativeModel[]> {
    const initiativeCollection = MongoHelper.getCollection('initiatives')
    const initiatives = await initiativeCollection.find().toArray()
    return initiatives
  }
}
