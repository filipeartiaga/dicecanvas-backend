import { FeatModel } from '../../../domain/models/feat/feat'

export interface GetAllFeatRepository {
  getAll: () => Promise<FeatModel[]>
}
