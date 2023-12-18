import { LogModel } from '../../../domain/models/log/log'

export interface AllLogGetter {
  getAll(): Promise<LogModel[]>
}
