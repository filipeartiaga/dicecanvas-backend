import { LogModel } from 'src/domain/models/log/log'

export interface GetAllLogs {
  getAll (): Promise<LogModel[]>
}
