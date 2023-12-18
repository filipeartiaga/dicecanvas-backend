import { AddLogRepository } from '../../protocols/log/add-log-repository'
import { LogModel } from '../../../domain/models/log/log'
import { AddLog, AddLogModel } from '../../../domain/usescases/log/add-log'

export class DbAddLog implements AddLog {
  private readonly addLogRepository: AddLogRepository

  constructor (addLogRepository: AddLogRepository) {
    this.addLogRepository = addLogRepository
  }

  async add (logData: AddLogModel): Promise<LogModel> {
    const log = await this.addLogRepository.add(logData)
    return log
  }
}
