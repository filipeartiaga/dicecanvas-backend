import { CharacterSheetModel } from '../../../../domain/models/character-sheet/character-sheet'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetAllCharacterSheetMongoRepository implements GetAllCharacterSheetMongoRepository {
  async getAllMyCharacterSheet (_id: string): Promise<CharacterSheetModel[]> {
    const characterSheetCollection = MongoHelper.getCollection('characterSheets')
    const characterSheets = await characterSheetCollection.find({ creator: _id }).toArray()
    return characterSheets
  }
}
