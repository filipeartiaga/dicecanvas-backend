import { DeleteFeat } from '../../../domain/usescases/feat/delete-feat'
import { DeleteFeatRepository } from '../../protocols/feat/delete-feat-repository'

export class DbDeleteFeat implements DeleteFeat {
  private readonly deleteFeatRepository: DeleteFeatRepository

  constructor (deleteFeatRepository: DeleteFeatRepository) {
    this.deleteFeatRepository = deleteFeatRepository
  }

  async delete (_id: string): Promise<any> {
    const response = await this.deleteFeatRepository.delete(_id)
    return response
  }
}
