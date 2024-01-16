import { GetFeatRepository } from '../../protocols/feat/get-feat-repository'
import { GetFeat } from '../../../domain/usescases/feat/get-feat'
import { FeatModel } from '../../../domain/models/feat/feat'

export class DbGetFeat implements GetFeat {
  private readonly getFeatRepository: GetFeatRepository

  constructor (getFeatRepository: GetFeatRepository) {
    this.getFeatRepository = getFeatRepository
  }

  async getById (_id: string): Promise<FeatModel | null> {
    const Feat = await this.getFeatRepository.getById(_id)
    return Feat
  }
}
