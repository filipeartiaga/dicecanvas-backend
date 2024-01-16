import { FeatModel } from '../../models/feat/feat'

export interface AddFeatModel {
  name: string
  abilityScoresIncrease: {
    strength: {
      isChoice: boolean
      isChecked: boolean
    }
    dexterity: {
      isChoice: boolean
      isChecked: boolean
    }
    constitution: {
      isChoice: boolean
      isChecked: boolean
    }
    intelligence: {
      isChoice: boolean
      isChecked: boolean
    }
    wisdom: {
      isChoice: boolean
      isChecked: boolean
    }
    charisma: {
      isChoice: boolean
      isChecked: boolean
    }
  }
  description: string
  prerequisites: string
}

export interface AddFeat {
  add (feat: AddFeatModel): Promise<FeatModel>
}
