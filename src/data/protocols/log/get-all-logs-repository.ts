import { LogModel } from '../../../domain/models/log/log'

export interface GetAllLogsRepository {
  getAll: () => Promise<LogModel[]>
}
