import { CharacterSheetModel } from '../../../../domain/models/character-sheet/character-sheet'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateCharacterSheetMongoRepository implements UpdateCharacterSheetMongoRepository {
  async update (characterSheet: CharacterSheetModel): Promise<CharacterSheetModel> {
    const statusCollection = await MongoHelper.getCollection('characterSheets')
    const result = await statusCollection.findOneAndUpdate(
      { _id: characterSheet._id },
      {
        $set: {
          name: characterSheet.name,
          baseClass: characterSheet.baseClass,
          race: characterSheet.race,
          level: characterSheet.level,
          background: characterSheet.background,
          alignment: characterSheet.alignment,
          experiencePoints: characterSheet.experiencePoints,
          inspiration: characterSheet.inspiration,
          proficiencyBonus: characterSheet.proficiencyBonus,
          armorClass: characterSheet.armorClass,
          initiative: characterSheet.initiative,
          speed: characterSheet.speed,
          maxHitpoints: characterSheet.maxHitpoints,
          currentHitpoints: characterSheet.currentHitpoints,
          hitDice: characterSheet.hitDice,
          totalHitDice: characterSheet.totalHitDice,
          personalityTraits: characterSheet.personalityTraits,
          ideals: characterSheet.ideals,
          bonds: characterSheet.bonds,
          flaws: characterSheet.flaws,
          abilityScores: characterSheet.abilityScores,
          savingThrows: characterSheet.savingThrows,
          skills: characterSheet.skills,
          deathSaves: characterSheet.deathSaves
        }
      },
      { returnDocument: 'after' }
    )
    return result.value
  }
}
