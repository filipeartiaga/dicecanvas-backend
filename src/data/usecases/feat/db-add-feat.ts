import { AddFeatRepository } from '../../protocols/feat/add-feat-repository'
import { FeatModel } from '../../../domain/models/feat/feat'
import { AddFeat, AddFeatModel } from '../../../domain/usescases/feat/add-feat'

export class DbAddFeat implements AddFeat {
  private readonly addFeatRepository: AddFeatRepository

  constructor (addFeatRepository: AddFeatRepository) {
    this.addFeatRepository = addFeatRepository
  }

  async add (featData: AddFeatModel): Promise<FeatModel> {
    const feat = await this.addFeatRepository.add(featData)
    return feat
  }
}
