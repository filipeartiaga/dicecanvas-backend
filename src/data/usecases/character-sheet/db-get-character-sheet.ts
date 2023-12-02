import { GetCharacterSheetRepository } from '../../protocols/character-sheet/get-character-sheet-repository'
import { GetCharacterSheet } from '../../../domain/usescases/character-sheet/get-character-sheet'
import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export class DbGetCharacterSheet implements GetCharacterSheet {
  private readonly getCharacterSheetRepository: GetCharacterSheetRepository

  constructor (getCharacterSheetRepository: GetCharacterSheetRepository) {
    this.getCharacterSheetRepository = getCharacterSheetRepository
  }

  async getById (_id: string): Promise<CharacterSheetModel | null> {
    const characterSheet = await this.getCharacterSheetRepository.getById(_id)
    return characterSheet
  }
}
