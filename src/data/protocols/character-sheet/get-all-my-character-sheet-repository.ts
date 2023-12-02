import { CharacterSheetModel } from '../../../domain/models/character-sheet/character-sheet'

export interface GetAllMyCharacterSheetRepository {
  getAllMyCharacterSheet: (_id: string) => Promise<CharacterSheetModel[]>
}
