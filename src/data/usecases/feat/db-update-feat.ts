import { UpdateFeatRepository } from '../../protocols/feat/update-feat-repository'
import { FeatModel } from '../../../domain/models/feat/feat'
import { UpdateFeat } from '../../../domain/usescases/feat/update-feat'

export class DbUpdateFeat implements UpdateFeat {
  private readonly updateFeatRepository: UpdateFeatRepository

  constructor (updateFeatRepository: UpdateFeatRepository) {
    this.updateFeatRepository = updateFeatRepository
  }

  async update (Feat: FeatModel): Promise<FeatModel> {
    const FeatUpdated = await this.updateFeatRepository.update(Feat)
    return FeatUpdated
  }
}
