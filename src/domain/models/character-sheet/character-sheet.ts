export interface CharacterSheetModel {
  _id: string
  creator: string
  name: string
  class: string
  race: string
  level: number
  background: string
  alignment: string
  experiencePoints: number
  inspiration: boolean
  proficiencyBonus: number
  armorClass: number
  initiative: number
  speed: number
  maxHitpoints: number
  currentHitpoints: number
  hitDice: string
  totalHitDice: number
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  abilityScores: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  savingThrows: {
    strength: boolean
    dexterity: boolean
    constitution: boolean
    intelligence: boolean
    wisdom: boolean
    charisma: boolean
  }
  skills: {
    acrobatics: boolean
    animalHandling: boolean
    arcana: boolean
    athletics: boolean
    deception: boolean
    history: boolean
    insight: boolean
    intimidation: boolean
    investigation: boolean
    medicine: boolean
    nature: boolean
    perception: boolean
    performance: boolean
    persuasion: boolean
    religion: boolean
    sleightOfHand: boolean
    stealth: boolean
    survival: boolean
  }
  deathSaves: {
    successes: number
    failures: number
  }
  createdAt: Date
}
