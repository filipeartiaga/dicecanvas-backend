import { LogModel } from 'src/domain/models/log/log'

export interface AddLogModel {
  userId: string
  characterSheetId: string
  type: string
  message: string
  rollResult: string
  rollRaw: string
}

export interface AddLog {
  add: (log: AddLogModel) => Promise<LogModel>
}
