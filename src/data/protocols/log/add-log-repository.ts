import { LogModel } from '../../../domain/models/log/log'
import { AddLogModel } from '../../../domain/usescases/log/add-log'

export interface AddLogRepository {
  add: (logData: AddLogModel) => Promise<LogModel>
}
