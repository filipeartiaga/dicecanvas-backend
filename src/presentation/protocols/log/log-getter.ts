import { LogModel } from '../../../domain/models/log/log'

export interface LogGetter {
  getById(_id: string): Promise<LogModel>
}
