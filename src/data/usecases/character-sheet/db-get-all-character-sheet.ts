import { GetAllCharacterSheetRepository } from '../../protocols/character-sheet/get-all-character-sheet-repository'
import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'
import { GetAllCharacterSheet } from '../../../domain/usescases/character-sheet/get-all-character-sheet'

export class DbGetAllCharacterSheet implements GetAllCharacterSheet {
  private readonly getAllCharacterSheetRepository: GetAllCharacterSheetRepository

  constructor (getAllCharacterSheetRepository: GetAllCharacterSheetRepository) {
    this.getAllCharacterSheetRepository = getAllCharacterSheetRepository
  }

  async getAll (): Promise<CharacterSheetModel[]> {
    const characterSheet = await this.getAllCharacterSheetRepository.getAll()
    return characterSheet
  }
}
