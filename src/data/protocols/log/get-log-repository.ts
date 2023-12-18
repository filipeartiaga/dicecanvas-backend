import { LogModel } from '../../../domain/models/log/log'

export interface GetLogRepository {
  getById: () => Promise<LogModel>
}
