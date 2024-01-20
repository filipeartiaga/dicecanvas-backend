import { CharacterSheetModel } from '../../models/character-sheet/character-sheet'

export interface AddCharacterSheetModel {
  creator: string
  name: string
  classes: [{
    name: string
    level: number
  }]
  race: string
  level: number
  background: string
  alignment: string
  experiencePoints: number
  inspiration: boolean
  armorClass: number
  maxHitpoints: number
  currentHitpoints: number
  temporaryHitpoints: number
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
    successes: boolean[]
    failures: boolean[]
  }
  attacks: Array<{
    name: string
    bonus: number
    damage: string
    damageType: string
  }>
  equipment: string[]
  feats: string[]
  featuresAndTraits: string[]
  otherProficiencies: string[]
  buffsAndNerfs: {
    guidance: boolean
    bless: boolean
    bane: boolean
    resistance: boolean
  }
  spellSlots: [{
    slots: [{
      used: boolean
    }]
  }]
  customSlots: [{
    name: string
    slots: [{
      used: boolean
    }]
  }]
  wealth: {
    copper: number
    silver: number
    electrum: number
    gold: number
    platinum: number
  }
  expertize: {
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
  additionalConfigs: {
    bonusInitiative: number
    bonusSpeed: number
  }
  notes: [{
    name: string
    rows: number
    text: string
  }]
  createdAt: Date
}

export interface AddCharacterSheet {
  add (characterSheet: AddCharacterSheetModel): Promise<CharacterSheetModel>
}
