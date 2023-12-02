import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface CharacterSheetGetter {
  getById(_id: string): Promise<CharacterSheetModel | null>
}
