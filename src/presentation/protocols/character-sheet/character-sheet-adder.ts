import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'
import { AddCharacterSheetModel } from '../../../domain/usescases/character-sheet/add-character-sheet'

export interface CharacterSheetAdder {
  add(characterSheetData: AddCharacterSheetModel): Promise<CharacterSheetModel>
}
