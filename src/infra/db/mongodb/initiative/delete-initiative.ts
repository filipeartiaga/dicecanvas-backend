import { InitiativeModel } from '../../../../domain/models/initiative/initiative'
import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteInitiativeMongoRepository implements DeleteInitiativeMongoRepository {
  async delete (initiative: InitiativeModel): Promise<any> {
    const initiativesCollection = MongoHelper.getCollection('initiatives')
    const response = await initiativesCollection.removeOne(initiative._id)
    return response
  }
}
