import { CharacterSheetModel } from '../../../../domain/models/character-sheet/character-sheet'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetCharacterSheetMongoRepository implements GetCharacterSheetMongoRepository {
  async getById (_id: string): Promise<CharacterSheetModel> {
    const userCollection = MongoHelper.getCollection('characterSheets')
    const userIdObjectId = new ObjectId(_id)
    const characterSheet = await userCollection.findOne({ _id: userIdObjectId })
    return characterSheet
  }
}
