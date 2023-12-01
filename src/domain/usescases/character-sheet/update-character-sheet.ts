import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface UpdateCharacterSheet {
  update (characterSheet: CharacterSheetModel): Promise<CharacterSheetModel>
}
