import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'
import { GetAllMyCharacterSheet } from '../../../domain/usescases/character-sheet/get-all-my-character-sheet'
import { GetAllMyCharacterSheetRepository } from '../../../data/protocols/character-sheet/get-all-my-character-sheet-repository'

export class DbGetAllMyCharacterSheet implements GetAllMyCharacterSheet {
  private readonly getAllMyCharacterSheetRepository: GetAllMyCharacterSheetRepository

  constructor (getAllMyCharacterSheetRepository: GetAllMyCharacterSheetRepository) {
    this.getAllMyCharacterSheetRepository = getAllMyCharacterSheetRepository
  }

  async getAllMyCharacterSheet (_id: string): Promise<CharacterSheetModel[]> {
    const characterSheet = await this.getAllMyCharacterSheetRepository.getAllMyCharacterSheet(_id)
    return characterSheet
  }
}
