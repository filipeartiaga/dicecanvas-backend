import { CharacterSheetModel } from '../../models/sheet/character-sheet'

export interface GetCharacterSheet {
  getById (_id: string): Promise<CharacterSheetModel | null>
}
