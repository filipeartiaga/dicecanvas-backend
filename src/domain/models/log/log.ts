import { RollResult } from './roll-result'

export interface LogModel {
  _id: string
  userId: string
  characterSheetId: string
  type: string
  message: string
  rollResult: RollResult
  rollNotation: string
  createdAt: Date
}
