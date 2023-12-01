import { CharacterSheetModel } from 'src/domain/models/character-sheet/character-sheet'

export interface UpdateCharacterSheetRepository {
  update: (characterSheet: CharacterSheetModel) => Promise<CharacterSheetModel>
}
