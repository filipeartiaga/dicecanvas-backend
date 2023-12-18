export interface RollResult {
  dices: Dice[]
  modifiers: number
  result: number
}

export interface Dice {
  quality: number
  result: number
}
