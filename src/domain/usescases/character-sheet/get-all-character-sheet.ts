import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface GetCharacterSheet {
  getAll (): Promise<CharacterSheetModel[]>
}
