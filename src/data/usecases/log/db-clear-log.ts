import { ClearLog } from '../../../domain/usescases/log/clear-log'
import { ClearLogRepository } from '../../protocols/log/clear-log-repository'

export class DbClearLog implements ClearLog {
  private readonly clearLogRepository: ClearLogRepository

  constructor (clearLogRepository: ClearLogRepository) {
    this.clearLogRepository = clearLogRepository
  }

  async clear (): Promise<any> {
    const response = await this.clearLogRepository.clear()
    return response
  }
}
