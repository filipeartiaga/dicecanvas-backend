export interface RollResult {
  die: Dice[]
  modifiers: number
  result: number
}

export interface Dice {
  notation: string
  result: number
  rolls: Roll[]
  hasAdvantage: boolean
  hasDisadvantage: boolean
}

export interface Roll {
  result: number
  isUsed: boolean
}
