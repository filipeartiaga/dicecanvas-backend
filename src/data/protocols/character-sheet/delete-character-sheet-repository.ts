import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface DeleteCharacterSheetRepository {
  delete: (_id: string) => Promise<CharacterSheetModel>
}
