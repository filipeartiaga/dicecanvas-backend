import { RollResult } from './roll-result'

export interface LogModel {
  _id: string
  session: string
  userId: string
  characterSheetId: string
  type: string
  message: string
  rollResult: RollResult
  checkType: string
  createdAt: Date
}
