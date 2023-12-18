import { GetAllLogsRepository } from '../../protocols/log/get-all-logs-repository'
import { LogModel } from '../../../domain/models/log/log'
import { GetAllLogs } from '../../../domain/usescases/log/get-all-logs'

export class DbGetAllLog implements GetAllLogs {
  private readonly getAllLogRepository: GetAllLogsRepository

  constructor (getAllLogRepository: GetAllLogsRepository) {
    this.getAllLogRepository = getAllLogRepository
  }

  async getAll (): Promise<LogModel[]> {
    const cog = await this.getAllLogRepository.getAll()
    return cog
  }
}
