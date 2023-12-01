import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface GetCharacterSheet {
  getById (_id: string): Promise<CharacterSheetModel | null>
}
