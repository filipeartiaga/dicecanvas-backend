import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface GetCharacterSheetRepository {
  getAll: () => Promise<CharacterSheetModel>
}
