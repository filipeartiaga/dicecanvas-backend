import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteCharacterSheetMongoRepository implements DeleteCharacterSheetMongoRepository {
  async delete (_id: string): Promise<any> {
    const userCollection = MongoHelper.getCollection('characterSheets')
    const response = await userCollection.delete({ _id })
    return response
  }
}
