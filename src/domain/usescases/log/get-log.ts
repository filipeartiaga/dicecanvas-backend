import { LogModel } from '../../../domain/models/log/log'

export interface GetLog {
  getById (): Promise<LogModel>
}
