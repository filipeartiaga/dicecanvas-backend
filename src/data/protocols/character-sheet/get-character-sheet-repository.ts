import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface GetCharacterSheetRepository {
  getById: (_id: string) => Promise<CharacterSheetModel | null>
}
