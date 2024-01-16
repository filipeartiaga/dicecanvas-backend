import { FeatModel } from '../../../domain/models/feat/feat'

export interface UpdateFeatRepository {
  update: (Feat: FeatModel) => Promise<FeatModel>
}
