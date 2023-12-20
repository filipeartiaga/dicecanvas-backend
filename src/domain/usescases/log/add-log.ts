import { RollResult } from '../../../domain/models/log/roll-result'
import { LogModel } from '../../../domain/models/log/log'

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
