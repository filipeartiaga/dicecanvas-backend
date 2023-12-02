import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface GetAllCharacterSheet {
  getAll (): Promise<CharacterSheetModel[]>
}
