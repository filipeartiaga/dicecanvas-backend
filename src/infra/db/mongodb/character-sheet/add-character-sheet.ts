import { CharacterSheetModel } from '../../../../domain/models/character-sheet/character-sheet'
import { AddCharacterSheetModel } from '../../../../domain/usescases/character-sheet/add-character-sheet'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddCharacterSheetMongoRepository implements AddCharacterSheetMongoRepository {
  async add (characterSheetData: AddCharacterSheetModel): Promise<CharacterSheetModel> {
    const characterSheetCollection = await MongoHelper.getCollection('characterSheets')
    const result = await characterSheetCollection.insertOne(characterSheetData)
    return result.ops[0]
  }
}
