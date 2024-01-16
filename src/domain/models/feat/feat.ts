export interface FeatModel {
  _id: string
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
