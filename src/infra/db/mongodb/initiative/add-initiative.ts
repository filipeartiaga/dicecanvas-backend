import { InitiativeModel } from '../../../../domain/models/initiative/initiative'
import { AddInitiativeModel } from '../../../../domain/usescases/initiative/add-initiative'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddInitiativeMongoRepository implements AddInitiativeMongoRepository {
  async add (initiativeData: AddInitiativeModel): Promise<InitiativeModel> {
    const initiativeCollection = await MongoHelper.getCollection('initiatives')
    const result = await initiativeCollection.insertOne(initiativeData)
    return result.ops[0]
  }
}
