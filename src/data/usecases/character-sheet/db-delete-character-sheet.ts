import { DeleteCharacterSheet } from '../../../domain/usescases/character-sheet/delete-character-sheet'
import { DeleteCharacterSheetRepository } from '../../protocols/character-sheet/delete-character-sheet-repository'
import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export class DbDeleteCharacterSheet implements DeleteCharacterSheet {
  private readonly deleteCharacterSheetRepository: DeleteCharacterSheetRepository

  constructor (deleteCharacterSheetRepository: DeleteCharacterSheetRepository) {
    this.deleteCharacterSheetRepository = deleteCharacterSheetRepository
  }

  async delete (_id: string): Promise<CharacterSheetModel> {
    const characterSheetUpdated = await this.deleteCharacterSheetRepository.delete(_id)
    return characterSheetUpdated
  }
}
