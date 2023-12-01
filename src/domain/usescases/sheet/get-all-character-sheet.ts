import { CharacterSheetModel } from '../../models/sheet/character-sheet'

export interface GetCharacterSheet {
  getAll (): Promise<CharacterSheetModel[]>
}
