import { LogModel } from '../../../domain/models/log/log'

export interface GetLogRepository {
  getById: (_id: string) => Promise<LogModel>
}
