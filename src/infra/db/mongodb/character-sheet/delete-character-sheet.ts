import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteCharacterSheetMongoRepository implements DeleteCharacterSheetMongoRepository {
  async delete (_id: string): Promise<any> {
    const characterSheetCollection = MongoHelper.getCollection('characterSheets')
    const response = await characterSheetCollection.deleteOne({ _id })
    return response
  }
}
