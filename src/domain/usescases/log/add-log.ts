import { RollResult } from '../../models/log/roll-result'
import { LogModel } from '../../models/log/log'

export interface AddLogModel {
  userId: string
  characterSheetId: string
  type: string
  message: string
  rollResult: RollResult
  checkType: string
  createdAt: Date
}

export interface AddLog {
  add: (log: AddLogModel) => Promise<LogModel>
}
