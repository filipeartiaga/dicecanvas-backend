import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface CharacterSheetUpdater {
  update(characterSheet: CharacterSheetModel): Promise<CharacterSheetModel>
}
