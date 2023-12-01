import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface DeleteCharacterSheetRepository {
  delete: (characterSheet: CharacterSheetModel) => Promise<CharacterSheetModel>
}
