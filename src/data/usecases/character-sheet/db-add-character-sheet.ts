import { AddCharacterSheetRepository } from '../../protocols/character-sheet/add-character-sheet-repository'
import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'
import { AddCharacterSheet, AddCharacterSheetModel } from '../../../domain/usescases/character-sheet/add-character-sheet'

export class DbAddCharacterSheet implements AddCharacterSheet {
  private readonly addCharacterSheetRepository: AddCharacterSheetRepository

  constructor (addCharacterSheetRepository: AddCharacterSheetRepository) {
    this.addCharacterSheetRepository = addCharacterSheetRepository
  }

  async add (characterSheetData: AddCharacterSheetModel): Promise<CharacterSheetModel> {
    const characterSheet = await this.addCharacterSheetRepository.add(characterSheetData)
    return characterSheet
  }
}
