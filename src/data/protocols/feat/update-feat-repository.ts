import { FeatModel } from '../../../domain/models/feat/feat'

export interface UpdateFeatRepository {
  update: (feat: FeatModel) => Promise<FeatModel>
}
