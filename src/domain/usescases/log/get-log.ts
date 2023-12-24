import { LogModel } from '../../models/log/log'

export interface GetLog {
  getById (_id: string): Promise<LogModel>
}
