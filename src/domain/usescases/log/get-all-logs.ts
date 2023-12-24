import { LogModel } from '../../models/log/log'

export interface GetAllLogs {
  getAll (): Promise<LogModel[]>
}
