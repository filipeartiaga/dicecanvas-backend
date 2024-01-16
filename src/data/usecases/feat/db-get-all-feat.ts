import { GetAllFeatRepository } from '../../protocols/feat/get-all-feat-repository'
import { FeatModel } from '../../../domain/models/feat/feat'
import { GetAllFeat } from '../../../domain/usescases/feat/get-all-feat'

export class DbGetAllFeat implements GetAllFeat {
  private readonly getAllFeatRepository: GetAllFeatRepository

  constructor (getAllFeatRepository: GetAllFeatRepository) {
    this.getAllFeatRepository = getAllFeatRepository
  }

  async getAll (): Promise<FeatModel[]> {
    const Feat = await this.getAllFeatRepository.getAll()
    return Feat
  }
}
