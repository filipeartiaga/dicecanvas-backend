import { LogModel } from '../../../domain/models/log/log'

export interface GetAllLogs {
  getAll (): Promise<LogModel[]>
}
