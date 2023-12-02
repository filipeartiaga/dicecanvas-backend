import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface ICharacterSheetUpdater {
  update(characterSheet: CharacterSheetModel): Promise<CharacterSheetModel>
}
