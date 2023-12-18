import { LogModel } from '../../../domain/models/log/log'
import { AddLogModel } from '../../../domain/usescases/log/add-log'

export interface LogAdder {
  add(logData: AddLogModel): Promise<LogModel>
}
