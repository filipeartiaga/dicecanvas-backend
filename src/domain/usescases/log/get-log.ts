import { LogModel } from '../../../domain/models/log/log'

export interface GetLog {
  getById (_id: string): Promise<LogModel>
}
