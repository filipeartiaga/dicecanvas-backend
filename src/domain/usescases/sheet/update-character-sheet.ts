import { CharacterSheetModel } from '../../models/sheet/character-sheet'

export interface UpdateCharacterSheet {
  update (characterSheet: CharacterSheetModel): Promise<CharacterSheetModel>
}
