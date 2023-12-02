import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface GetAllMyCharacterSheet {
  getAllMyCharacterSheet (_id: string): Promise<CharacterSheetModel[]>
}
