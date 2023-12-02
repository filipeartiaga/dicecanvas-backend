import { UpdateCharacterSheetRepository } from '../../protocols/character-sheet/update-character-sheet-repository'
import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'
import { UpdateCharacterSheet } from '../../../domain/usescases/character-sheet/update-character-sheet'

export class DbUpdateCharacterSheet implements UpdateCharacterSheet {
  private readonly updateCharacterSheetRepository: UpdateCharacterSheetRepository

  constructor (updateCharacterSheetRepository: UpdateCharacterSheetRepository) {
    this.updateCharacterSheetRepository = updateCharacterSheetRepository
  }

  async update (characterSheet: CharacterSheetModel): Promise<CharacterSheetModel> {
    const characterSheetUpdated = await this.updateCharacterSheetRepository.update(characterSheet)
    return characterSheetUpdated
  }
}
