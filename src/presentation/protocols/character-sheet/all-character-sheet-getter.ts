import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface AllCharacterSheetGetter {
  getAll(): Promise<CharacterSheetModel[]>
}
