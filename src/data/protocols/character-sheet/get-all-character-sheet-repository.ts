import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface GetAllCharacterSheetRepository {
  getAll: () => Promise<CharacterSheetModel[]>
}
