import { LogModel } from '../../../domain/models/log/log'
import { GetLogRepository } from '../../protocols/log/get-log-repository'
import { GetLog } from '../../../domain/usescases/log/get-log'

export class DbGetLog implements GetLog {
  private readonly getLogRepository: GetLogRepository

  constructor (getLogRepository: GetLogRepository) {
    this.getLogRepository = getLogRepository
  }

  async getById (_id: string): Promise<LogModel> {
    const log = await this.getLogRepository.getById(_id)
    return log
  }
}
