import { DeleteCharacterSheet } from '../../../domain/usescases/character-sheet/delete-character-sheet'
import { DeleteCharacterSheetRepository } from '../../protocols/character-sheet/delete-character-sheet-repository'

export class DbDeleteCharacterSheet implements DeleteCharacterSheet {
  private readonly deleteCharacterSheetRepository: DeleteCharacterSheetRepository

  constructor (deleteCharacterSheetRepository: DeleteCharacterSheetRepository) {
    this.deleteCharacterSheetRepository = deleteCharacterSheetRepository
  }

  async delete (_id: string): Promise<any> {
    const response = await this.deleteCharacterSheetRepository.delete(_id)
    return response
  }
}
