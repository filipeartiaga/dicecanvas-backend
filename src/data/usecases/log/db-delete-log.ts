import { DeleteLog } from '../../../domain/usescases/log/delete-log'
import { DeleteLogRepository } from '../../protocols/log/delete-log-repository'

export class DbDeleteLog implements DeleteLog {
  private readonly deleteLogRepository: DeleteLogRepository

  constructor (deleteLogRepository: DeleteLogRepository) {
    this.deleteLogRepository = deleteLogRepository
  }

  async delete (_id: string): Promise<any> {
    const response = await this.deleteLogRepository.delete(_id)
    return response
  }
}
